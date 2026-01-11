import AppProvidersWrapper from './components/wrappers/AppProvidersWrapper';
import configureFakeBackend from './helpers/fake-backend';
import AppRouter from './routes/router';
import '@/assets/scss/app.scss';
configureFakeBackend();
const App = () => {
  return <AppProvidersWrapper>
    {/* remove appproviderwrapper */}
      <AppRouter />
    </AppProvidersWrapper>;
};
export default App;