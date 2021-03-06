const words = [
    "Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit.",
    "Donec", "sapien", "arcu,", "rhoncus", "vel", "urna", "vel,", "tempus", "tempor",
    "erat.", "Suspendisse", "ac", "sodales", "erat,", "id", "posuere", "elit.",
    "Suspendisse", "consectetur", "erat", "ac", "volutpat", "laoreet.", "Nulla",
    "ut", "quam", "quam.", "Suspendisse", "potenti.", "Integer", "sem", "metus,",
    "hendrerit", "eget", "suscipit", "ac,", "dapibus", "nec", "nisi.", "Donec",
    "dignissim", "accumsan", "lacus,", "in", "lacinia", "mauris", "fermentum",
    "sollicitudin.", "Fusce", "ultricies", "lobortis", "nisi", "eget", "eleifend.",
    "Curabitur", "eu", "augue", "massa.", "Mauris", "luctus", "pellentesque", "magna,",
    "ut", "ornare", "odio", "vulputate", "sit", "amet.", "Aenean", "non", "consectetur",
    "massa,", "nec", "ornare", "ante.", "Cras", "et", "congue", "ex,", "in", "porta",
    "ex.", "Sed", "nec", "mi", "et", "lectus", "tempus", "pulvinar", "at", "a", "ipsum.",
    "Suspendisse", "ultrices", "nisi", "nec", "quam", "laoreet,", "ut", "tincidunt",
    "elit", "bibendum.", "Proin", "finibus", "est", "in", "lorem", "cursus,", "vel",
    "maximus", "velit", "viverra.", "Etiam", "euismod", "ipsum", "venenatis", "dolor",
    "vehicula", "vulputate.", "Curabitur", "vestibulum,", "nisl", "sit", "amet",
    "ultrices", "auctor,", "leo", "ipsum", "sagittis", "diam,", "vel", "dictum",
    "diam", "tellus", "sit", "amet", "leo.", "Integer", "eu", "massa", "vitae", "ligula",
    "rhoncus", "pharetra.", "Proin", "euismod,", "massa", "eu", "accumsan", "mollis,",
    "erat", "ante", "gravida", "felis,", "sed", "vehicula", "ante", "nisl", "ultricies",
    "augue.", "Nulla", "leo", "felis,", "dapibus", "eget", "pellentesque", "et,",
    "blandit", "id", "leo.", "Donec", "in", "libero", "iaculis,", "tincidunt", "turpis",
    "eu,", "pretium", "est.", "In", "imperdiet", "ornare", "urna", "in", "venenatis.",
    "Interdum", "et", "malesuada", "fames", "ac", "ante", "ipsum", "primis", "in",
    "faucibus.", "Ut", "ut", "faucibus", "tortor.", "Sed", "feugiat", "molestie",
    "vestibulum.", "Integer", "a", "pellentesque", "urna.", "Quisque", "tempus,",
    "sapien", "sit", "amet", "lobortis", "dapibus,", "diam", "urna", "fermentum",
    "mauris,", "quis", "lobortis", "nisl", "est", "eget", "nisl.", "Maecenas", "non",
    "nulla", "porttitor,", "pharetra", "lectus", "non,", "gravida", "velit.", "Interdum",
    "et", "malesuada", "fames", "ac", "ante", "ipsum", "primis", "in", "faucibus.",
    "Fusce", "ac", "est", "aliquam,", "hendrerit", "tellus", "in,", "cursus", "magna.",
    "Nunc", "elementum,", "diam", "non", "pretium", "dignissim,", "urna", "orci",
    "faucibus", "libero,", "ut", "placerat", "nulla", "tortor", "id", "orci.", "Ut",
    "gravida", "ante", "in", "elit", "dignissim", "hendrerit.", "Aenean", "ac", "justo",
    "ac", "purus", "sagittis", "efficitur", "sit", "amet", "vitae", "neque.", "Cras",
    "iaculis", "leo", "vitae", "risus", "bibendum"
];

export default function lorem(count = 1) {
    return `${words.slice(0, Math.min(count, words.length)).join(" ")}...`;
}