import { h, render, Component } from 'preact';
import Glossary from './index.jsx';
import glossary from './../../../../_data/glossary.json';
import createGlossaryGroupedObject from './../../../utilities/js/helpers/createGlossaryGroupedObject.js';
import lunrSearchWrapper from './../../../utilities/js/helpers/lunrSearchWrapper.js';
import wrapStringPhrases from './../../../utilities/js/helpers/wrapStringPhrases.js';


const { items: glossaryObject } = glossary;

class GlossaryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPhrase: '',
      currentItems: this.props.glossaryObject,
    };

    this.eventHandlers = {
      changePhrase: this.changePhrase.bind(this),
    };
  }


  changePhrase(phrase) {
    this.setState({ currentPhrase: phrase });

    if (phrase.length > 2) {
      const letters = Object.keys(this.props.glossaryObject);

      const filteredList = letters.reduce(
        (result, letter) => {
          const array = this.props.glossaryObject[letter];

          const filteredItems = lunrSearchWrapper(
            array,
            'phrase',
            ['phrase', 'description'],
            phrase,
          );

          const phraseArray = [phrase, ...phrase.split(' ')];
          const wrapFn = string => `<em class="Highlight">${string}</em>`;

          const innerResult = filteredItems.map((obj) => {
            return {
              ...obj,
              ...{
                phrase: wrapStringPhrases(obj.phrase, phraseArray, wrapFn),
                description: wrapStringPhrases(obj.description, phraseArray, wrapFn),
              },
            };
          });

          return {
            ...result,
            [letter]: innerResult,
          };
        },
        {},
      );

      return this.setState({ currentItems: filteredList });
    }

    return this.setState({ currentItems: this.props.glossaryObject });
  }


  render() {
    return <Glossary {...this.state} {...this.eventHandlers} />;
  }
}


function scripts() {
  const glossaryGroupedObject = createGlossaryGroupedObject(glossaryObject);
  const nodes = document.getElementsByClassName('js-initGlossary');

  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      render(<GlossaryContainer glossaryObject={glossaryGroupedObject} />, nodes[i]);
    }
  }
}


export default scripts();
