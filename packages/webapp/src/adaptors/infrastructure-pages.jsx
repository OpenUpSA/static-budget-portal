import axios from 'axios';
import React, { createElement, Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Infrastructure from '../views/Infrastructure';
import Loading from '../views/Loading';

const isConnectionYear = year => year === '2017' || year === '2018';

const buildEne = url => ({
  heading: 'Read more in the Department Budget',
  format: 'PDF',
  link: url,
});

const datasetUrl = url => ({
  heading: 'Infrastructure Project Data',
  format: 'CSV',
  link: url,
});

const parseProjects = (projects, innerDatasetUrl) =>
  projects.map(project => ({
    id: project.slug,
    subheading: project.department.name,
    heading: project.name,
    points: project.coordinates.map(({ latitude: y, longitude: x }, id) => ({
      id: id.toString(),
      x,
      y,
    })),
    activeProvinces: project.provinces,
    stage: project.stage,
    totalBudget: project.total_budget,
    projectedBudget: project.projected_budget,
    description: project.description,
    link: project.slug,
    resources: [buildEne(project.department.budget_document), datasetUrl(innerDatasetUrl)].filter(
      ({ link }) => !!link,
    ),
    chartData: project.expenditure.map(obj => ({
      name: obj.year,
      Actual: obj.budget_phase === 'Audited Outcome' ? obj.amount : null,
      Projected: obj.budget_phase !== 'Audited Outcome' ? obj.amount : null,
      Connection: isConnectionYear(obj.year) ? obj.amount : null,
    })),
    sideInfo: {
      investment: project.nature_of_investment,
      infrastructure: project.infrastructure_type,
      department: project.department,
    },
  }));

class InfrastructurePages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      projects: [],
      datasetUrl: null,
      points: [],
    };
  }

  componentDidMount() {
    axios.get('/json/infrastructure-projects.json').then(({ data }) => {
      this.setState({
        loading: false,
        datasetUrl: data.dataset_url,
        projects: parseProjects(data.projects, data.dataset_url),
      });
    });
  }

  render() {
    const { projects, points, loading, datasetUrl: innerDatasetUrl } = this.state;
    const { budgetReviewUrl, details, projectId } = this.props;

    if (loading) {
      return createElement(Loading);
    }

    return createElement(Infrastructure, {
      projects,
      points,
      datasetUrl: innerDatasetUrl,
      budgetReviewUrl,
      Link,
      details,
      projectId,
    });
  }
}

const node = document.querySelector('[data-webapp="infrastructure-pages"]');
const budgetReviewUrl = !!node && node.getAttribute('data-webapp-budgetReviewUrl');

const connection = () => {
  if (node) {
    return render(
      <Router>
        <div>
          <Route
            exact
            path="/infrastructure-projects"
            component={() => <InfrastructurePages {...{ budgetReviewUrl }} />}
          />
          <Route
            path="/infrastructure-projects/:projectId"
            component={({ match }) => (
              <InfrastructurePages
                {...{ budgetReviewUrl }}
                projectId={match.params.projectId}
                details
              />
            )}
          />
        </div>
      </Router>,
      node,
    );
  }

  return null;
};

export default connection();
