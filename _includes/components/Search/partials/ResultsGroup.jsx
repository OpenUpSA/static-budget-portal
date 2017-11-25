import { h } from 'preact';
import Loading from './Loading.jsx';


export default function ResultsGroups({ results, loading, selectedYear, count }) {
  const buildList = () => {
    if (results.length < 1) {
      return (
        <ul className="Search-list">
          <li className="Search-error">No results found</li>
        </ul>
      );
    }

    return (
      <ul className="Search-list">
        {
          results.map((item) => {
            const provSlugIndex = item.extras.findIndex(
              (data) => {
                return data.key === 'geographic_region_slug';
              },
            );

            const nameSlugIndex = item.extras.findIndex(
              (data) => {
                return data.key === 'department_name_slug';
              },
            );

            const provSlug = item.extras[provSlugIndex].value;
            const nameSlug = item.extras[nameSlugIndex].value;

            const type = item.province[0] || 'National';

            return (
              <li>
                <a className="Search-link" href={`/${selectedYear}/provincial/${provSlug}/departments/${nameSlug}`}>
                  {type} Department: {item.extras[0].value}
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  };

  return (
    <div>
      <span className="Search-title">
        Suggested Departments{count ? ` (Showing 4 of ${count})` : ''}
      </span>
      {loading ? <ul className="Search-list"><Loading /></ul> : buildList() }
    </div>
  );
}
