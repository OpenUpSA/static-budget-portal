import { ga } from 'react-ga';
import { h } from 'preact';
import PropTypes from 'prop-types';
import Icon from './Icon.jsx';


export default function FormArea({ setFocus, findSuggestions, currentKeywords, selectedYear }) {
  const searchUrl = `/${selectedYear}/search-result`;
  const updateKeyword = event => findSuggestions(event.target.value);
  const addFocus = () => setFocus(true);

  return (
    <form className="Search-form" action={searchUrl} method="GET">
      <input type="hidden" name="search_type" value="full-search" />
      <input type="hidden" name="search_string" value={currentKeywords} />

      <input
        autoComplete="off"
        className="Search-keywords"
        name="search"
        onFocus={addFocus}
        onInput={updateKeyword}
        placeholder="Search vulekamali"
        value={currentKeywords}
      />

      <div className="Search-action">
        <button className="Search-button" type="submit">
          <Icon />
        </button>
      </div>
    </form>
  );
}


FormArea.propTypes = {
  currentKeywords: PropTypes.string.isRequired,
  findSuggestions: PropTypes.func.isRequired,
  selectedYear: PropTypes.string.isRequired,
  setFocus: PropTypes.func.isRequired,
};
