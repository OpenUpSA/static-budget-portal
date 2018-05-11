import getProp from './../../../utilities/js/helpers/getProp.js';
import initComponents from './../../../utilities/js/helpers/initComponents.js';


function scripts() {
  const enhanceInstance = (node) => {
    const image = getProp('image', node, { parse: 'node', nodeParse: 'string', returnNode: true });
    const { node: imgNode, value } = image;
    imgNode.style.backgroundImage = `url('${value}')`;
  };

  initComponents('CsoMeta', enhanceInstance);
}


export default scripts();
