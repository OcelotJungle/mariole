import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import deleteFalsyValues from "../../utils/common/deleteFalsyValues";
import StylableSizeTable from "../../components/StylableSizeTable";
import { _get as getProduct } from "../api/products/[id]";
import { useCallback, useEffect, useState } from "react";
import FeedbackForm from "../../components/FeedbackForm";
import formatPrice from "../../utils/common/formatPrice";
import admin from "../../scss/adminButtons.module.scss";
import RecentBlock from "../../components/RecentBlock";
import blocks from "../../scss/blocks.module.scss";
import ForAdmin from "../../components/ForAdmin";
import { useTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import cycle from "../../utils/math/cycle";
import styles from "./[id].module.scss";
import Link from "next/link";
import cn from "classnames";

const existingSizes = ["S", "M", "L"];

export async function getServerSideProps({ locale, params: { id } }) {
    const product = getProduct({ locale, id: +id });
    if(product) return {
        props: {
            product: deleteFalsyValues(product),
            ...await serverSideTranslations(locale, ["product", "size-table", "feedback"])
        }
    };
    else return { notFound: true };
}

export default inject("store")(observer(function ProductPage({ store, product }) {
    const { t } = useTranslation("product");
    const { t: sizeTable } = useTranslation("size-table");
    const { t: feedback } = useTranslation("feedback");

    const [sliderOpened, setSliderOpened] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedSize, setSelectedSize] = useState();

    useEffect(() => setSelectedImage(product.images[0]), [product.images]);
    useEffect(() => setSelectedSize(product.sizes.find(size => existingSizes.includes(size))), [product.sizes]);

    useEffect(() => store.addToRecent(product.id), [product.id]);

    return (<>
        <div className={blocks.content_body}>
            <div className={styles.product_page}>
                <div className={styles.column}>
                    <ImagePreviewBlock
                        openSlider={() => setSliderOpened(true)}
                        setSelectedImage={setSelectedImage}
                        selectedImage={selectedImage}
                        images={product.images}
                    />
                </div>
                <div className={styles.column}>
                    <div className={styles.product_data}>
                        <div className={styles.data_row}>
                            <h2>{ product.locale.name }</h2>
                            <ForAdmin>
                                <Link href={`/admin/edit?id=${product.id}`}>
                                    <a>
                                        <button className={admin.button}>Изменить товар</button>
                                    </a>
                                </Link>
                            </ForAdmin>
                        </div>
                        <div className={styles.data_row}>
                            <p className={styles.price}>{ formatPrice(product.price) } &#8381;</p>
                        </div>
                        <div className={styles.data_row}>
                            <p>{ t("quantity") }</p>
                            <QuantitySelectionBlock {...{ selectedQuantity, setSelectedQuantity }} />
                            <p>{ t("color") }</p>
                            <ColorSelectionBlock links={product.links} currentId={product.id} />
                            <p>{ t("size") }</p>
                            <SizeSelectionBlock sizes={product.sizes} {...{ selectedSize, setSelectedSize }} />
                        </div>
                        <div className={styles.data_row}>
                            <CartButton id={product.id} size={selectedSize} quantity={selectedQuantity} t={t} />
                            <FavoriteButton id={product.id} t={t} />
                        </div>
                        <div className={cn(styles.data_row, styles.padding)}>
                            <p>{ product.locale.description }</p>
                        </div>
                        <div className={cn(styles.data_row, styles.padding)}>
                            <p>Цвет: Розовый (???)</p>
                        </div>
                        <InfoBlock title={t("composition")}>
                            {/* Основа: 100% вискоза. Подклад: 100% вискоза. */}
                            { product.locale.composition }
                        </InfoBlock>
                        <InfoBlock title={t("details")}>
                            {/* Рост модели 173 см, размер XS (40 RUS). 
                            На модели: жакет размера S (42 RUS). 
                            Рекомендуется только сухая чистка. */}
                            { product.locale.details }
                        </InfoBlock>
                        <InfoBlock title={sizeTable("title")}>
                            <StylableSizeTable styles={styles} t={sizeTable} />
                        </InfoBlock>
                        <InfoBlock title={t("feedback-title")}>
                            <FeedbackForm t={feedback} />
                        </InfoBlock>
                    </div>
                </div>
            </div>
            <ImageSlider
                close={() => setSliderOpened(false)}
                defaultImage={selectedImage}
                images={product.images}
                opened={sliderOpened}
            />
            <div className={blocks.content_block}>
                <RecentBlock styles={styles} />
            </div>
        </div>
    </>);
}));

const CartButton = inject("store")(observer(({ store, id, size, quantity, t }) => (
    <button className={styles.add_to_cart} onClick={() => store.addToCart(id, size, quantity)}>
        { t("add-to-cart") }
    </button>
)));

const FavoriteButton = inject("store")(observer(({ store, id, t }) => (
    <button
        className={cn(styles.add_to_favorite, { [styles.active]: store.favorite.includes(id) })}
        onClick={() => store.toggleFavorite(id)}
    >
        <span className={styles.favorite_icon} /> { t("add-to-favorite") }
    </button>
)));

function ImagePreviewBlock({ images, selectedImage, setSelectedImage, openSlider }) {
    const Preview = useCallback(({ active, image, toggle }) => (
        <div
            className={cn(styles.slider_preview_elem, { [styles.active]: active })}
            onClick={() => toggle(image)}
        >
            <img src={image} alt="" width="100%" />
        </div>
    ), []);

    return (
        <div className={styles.slider}>
            <div className={styles.slider_preview}>{images.map(image => (
                <Preview
                    active={selectedImage === image}
                    toggle={setSelectedImage}
                    image={image} key={image}
                />
            ))}</div>
            <div className={styles.slider_view} onClick={openSlider}>
                <img src={selectedImage} alt="" width="100%" />
            </div>
        </div>
    );
}

function ImageSlider({ opened, images, defaultImage, close }) {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => setActiveIndex(images.indexOf(defaultImage)), [defaultImage]);

    return (
        <div className={cn(styles.photo_modal, { [styles.opened]: opened })}>
            <div className={styles.photo_modal_content}>
                <div className={styles.img_wrapper}>
                    <img src={images[activeIndex]} alt="" width="100%" />
                </div>
                <div className={cn(styles.modal_navigation, { [styles.active]: opened })}>
                    <div
                        onClick={() => setActiveIndex(prev => cycle(prev - 1, images.length))}
                        className={cn(styles.navigation_button)}
                    >
                        <span className={styles.back} />
                    </div>
                    <div className={cn(styles.navigation_button)} onClick={close}>
                        <span className={styles.close} />
                    </div>
                    <div
                        onClick={() => setActiveIndex(prev => cycle(prev + 1, images.length))}
                        className={cn(styles.navigation_button)}
                    >
                        <span className={styles.next} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuantitySelectionBlock({ selectedQuantity, setSelectedQuantity }) {
    return (
        <div className={styles.choose_quantity}>
            <button onClick={() => setSelectedQuantity(prev => Math.max(prev - 1, 1))}>-</button>
            <span>{ selectedQuantity }</span>
            <button onClick={() => setSelectedQuantity(prev => prev + 1)}>+</button>
        </div>
    );
}

function ColorBlock({ active, link: { id, name, image } }) {
    return (
        <Link href={`/shop/${id}`}>
            <a>
                <div className={cn(styles.choose_color_elem, { [styles.active]: active })} >
                    <div className={styles.img_wrapper}>
                        <img src={image} alt="" width="100%" />
                    </div>
                    <div className={styles.popup}>{ name }</div>
                </div>
            </a>
        </Link>
    );
}

function ColorSelectionBlock({ links, currentId }) {
    return (
        <div className={styles.choose_color_wrapper}>{
            links.map(link => <ColorBlock key={link.id} active={link.id === currentId} link={link} />)
        }</div>
    );
}

function SizeBlock({ active, disabled, size, onClick }) {
    return (
        <div
            className={cn(styles.choose_size_elem, {
                [styles.active]: active,
                [styles.disabled]: disabled
            })} onClick={onClick}
        >{ size }</div>
    );
}

function SizeSelectionBlock({ sizes, selectedSize, setSelectedSize }) {
    return (
        <div className={styles.choose_size_wrapper}>{
            existingSizes.map(size => {
                const active = selectedSize === size;
                const available = sizes.includes(size);
                return (
                    <SizeBlock 
                        key={size} active={active} disabled={!available} size={size}
                        onClick={available ? () => setSelectedSize(size) : null}
                    />
                );
            })
        }</div>
    );
}

function InfoBlock({ title, children }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={cn(styles.data_row, styles.more_info_wrapper)}>
            <button
                className={cn(styles.show_more, { [styles.active]: expanded })}
                onClick={() => setExpanded(prev => !prev)}
            >
                { title } <span className={styles.show_more_icn} />
            </button>
            <div className={cn(styles.info, { [styles.opened]: expanded })}>
                { children }
            </div>
        </div>
    );
}