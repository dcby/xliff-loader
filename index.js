const { js2xml, xml2js } = require("xml-js");

function transform(content) {
    const xml = xml2js(content);
    process(xml);
    content = js2xml(xml);
    return content;
}

function process(node) {
    if (node.elements) {
        node.elements = node.elements.filter(e => e.name !== "context-group");

        for (const child of node.elements)
            process(child);
    }
}

module.exports = function (content, map, meta) {
    return transform(content);
};
