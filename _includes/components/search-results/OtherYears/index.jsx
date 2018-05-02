import { h } from 'preact';


export default function buildOtherYears({ items, search, selectedYear }) {
  return (
    <div className="Section is-bevel is-green">
      <div className="OtherYears">
        <div className="OtherYears-item u-paddingTop10">
          <div className="Section-title u-marginRight10 u-colorWhite">See results in other years</div>
        </div>
        {
          items.map(({ count, name }) => {
            if (selectedYear !== name) {
              const escapedSearch = encodeURI(search);

              return (
                <div className="OtherYears-item">
                  <a
                    className="Button is-secondary is-inline"
                    href={`/${name}/search-result?search_type=full-search&search_string=${escapedSearch}&search=${escapedSearch} `}
                  >
                    <span>{name}</span>
                    <span className="u-fontWeightNormal">&nbsp;({count})</span>
                  </a>
                </div>
              );
            }

            return null;
          })
        }
      </div>
    </div>
  );
}
