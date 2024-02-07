import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import EditPage from '../pages/EditPage';
import NotMatch from '../pages/NotMatch';
import DefaultLayout from '../layout/DefaultLayout';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="edit/:id?" element={<EditPage />} />
        <Route path="*" element={<NotMatch />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;