import './PageNotFound.scss';
import pageNotFoundIll from '../../assets/404 Error Page not Found with people connecting a plug-pana.svg';

function PageNotFound() {
  return (
    <section className="page-not-found-404">
      <div className="container">
        <img src={pageNotFoundIll} alt="page not found illustration" />
      </div>
    </section>
  );
}

export default PageNotFound;
