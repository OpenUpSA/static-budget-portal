import { h } from 'preact';
import tabOptions from './../data/tabOptions.json';
import StaticContent from './StaticContent.jsx';


const calcSectionObj = (type) => {
  switch (type) {
    case 'green': return {
      modifiers: ' is-green',
      color: ' u-colorWhite',
    };

    case 'purple': return {
      modifiers: ' is-purple',
      color: ' u-colorWhite',
    };

    case 'grey': return {
      modifiers: '',
      color: '',
    };

    default: return {
      modifiers: null,
      cardModifiers: null,
    };
  }
};


const createLinkText = (sphere, string) => {
  switch (sphere) {
    case 'national': return 'Estimates of National Expenditure (ENE)';
    case 'provincial': return 'Estimates of Provincial Revenue and Expenditure (EPRE)';
    case 'cso': return string;
    default: return null;
  }
};


const buildSnippet = (snippet, tab) => {
  if (tab === 'cso' && !snippet.organization) {
    return null;
  }
  return (
    <div>
      <div className="u-marginBottom20 u-lineHeight16" dangerouslySetInnerHTML={{ __html: snippet.text }} />
      <div>
        <span>Source:&nbsp;</span>
        <a target="_blank" href={snippet.url}>{createLinkText(tab, snippet.organization)}</a>
      </div>
    </div>
  );
};


function ItemPreview({ title, url, snippet, tab, paddingOverride }) {
  return (
    <div key={url} className={`Section u-marginBottom20 is-invisible${paddingOverride ? ' u-padding0' : ''}`}>
      <a href={url} className="Section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {snippet ? buildSnippet(snippet, tab) : null}
    </div>
  );
}


const calcNoticeObj = (amount, error) => {
  if (error) {
    return {
      size: 'is-1of1',
      title: 'Something went wrong.',
      text: 'Please try again at a later point.',
    };
  }

  switch (amount) {
    case 0: return {
      size: 'is-1of1',
      title: 'We found no results.',
      text: 'Try changing the searched year, or broaden your search terms',
    };

    case 1: return {
      size: 'is-2of3',
      title: 'We only found 1 result.',
      text: 'Try changing the searched year, or broaden your search terms.',
    };

    case 2: return {
      size: 'is-1of3',
      title: 'We only found 2 results.',
      text: 'Try changing the searched year, or broaden your search terms.',
    };

    default: return {
      size: null,
      title: null,
      text: null,
    };
  }
};


function Notice({ error, amount }) {
  if (!error && amount >= 3) {
    return null;
  }

  const { size, title: noticeTitle, text: noticeText } = calcNoticeObj(amount, error);

  const className = [
    'Grid-item',
    size,
    'u-textAlignCenter',
    'u-paddingBottom20',
  ].join(' ');

  return (
    <div {...{ className }}>
      <div className="Page-title u-marginBottom0">{noticeTitle}</div>
      <div className="Section-title u-maxWidth300 u-displayInlineBlock u-marginBottom20">{noticeText}</div>
    </div>
  );
}


const createOtherYears = (otherYears, color) => {
  return (
    <div className="Section-card is-invisible u-paddingBottom15">
      <div className="SearchResult-buttons">
        <div className="SearchResult-buttonsTitle">
          <div className={`Section-title${color}`}>See more results</div>
        </div>
        {
          otherYears.map(({ name, url, count: innerCount }) => {
            return (
              <div className="SearchResult-buttonItem">
                <a href={url} className="Button is-secondary is-inline">
                  <span>{name}</span>
                  <span className="u-fontWeightNormal">&nbsp;({innerCount} results)</span>
                </a>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};


function Section({ type, items, count, tab, otherYears, error }) {
  const { modifiers, color } = calcSectionObj(type);
  const validAmount = items.length;

  return (
    <div className={`Section is-bevel${modifiers}`}>
      <div className="Section-card u-paddingBottom0">
        <div className="Grid has-standardTrigger u-marginBottom30">
          <div className="Grid-inner">
            {error ?
              null :
              items.map(({ title, url, snippet }) => {
                return <div className="Grid-item is-1of3"><ItemPreview paddingOverride {...{ tab, url, title, snippet }} /></div>;
              })
            }
            <Notice amount={validAmount} {...{ error }} />
          </div>
        </div>
      </div>
      {otherYears.length > 0 ? createOtherYears(otherYears, color) : null}
    </div>
  );
}


const viewAll = (updateTabWrap, count) => {
  return (
    <div className="SearchResult-rightHeading">
      <button className="Page-title u-margin0 u-borderWidth0 u-backgroundNone u-textDecorationUnderline u-cursorPointer" onClick={updateTabWrap}>
        <span className="u-fontWeightNormal">See All&nbsp;</span>
        <span>{count}</span>
        <span className="u-fontWeightNormal">&nbsp;&gt;</span>
      </button>
    </div>
  );
};


const buildHeading = (year, tab, count, updateTab) => {
  const updateTabWrap = () => updateTab(tab, true);

  return (
    <div className="Section is-invisible u-paddingBottom0">
      <div className="SearchResult-heading">
        <div className="SearchResult-leftHeading">
          <div className="Page-title u-margin0">Found in {year} {tabOptions[tab]}</div>
        </div>
        {count > 3 ? viewAll(updateTabWrap, count) : null}
      </div>
    </div>
  );
};


export default function LandingLayout({ items: rawItems, year, error, updateTab }) {
  const items = rawItems || {};
  const provincial = items.provincial || {};
  const national = items.national || {};
  const contributed = items.contributed || {};
  const { videos, glossary } = rawItems;

  return (
    <div>
      <StaticContent {...{ videos, glossary }} />

      <div className="u-marginBottom20">
        {buildHeading(year, 'cso', contributed.count, updateTab)}
        <Section
          type="green"
          items={contributed.items || []}
          count={contributed.count}
          tab="cso"
          otherYears={[]}
          {...{ error }}
        />
      </div>

      <div className="u-marginBottom20">
        {buildHeading(year, 'national', national.count, updateTab)}
        <Section
          type="grey"
          items={national.items || []}
          count={national.items}
          tab="national"
          otherYears={national.otherYears || []}
          {...{ error }}
        />
      </div>

      <div className="u-marginBottom20">
        {buildHeading(year, 'provincial', provincial.count, updateTab)}
        <Section
          type="purple"
          items={provincial.items || []}
          count={provincial.items}
          tab="national"
          otherYears={provincial.otherYears || []}
          {...{ error }}
        />
      </div>
    </div>
  );
}
