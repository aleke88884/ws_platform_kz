import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

// Каждый экран — отдельный чанк. Имена совпадают с полем "screen" в routes.json
export const screens: Record<string, LazyExoticComponent<ComponentType>> = {
  Landing: lazy(() => import('../screens/learner/Landing')),
  SignIn: lazy(() => import('../screens/learner/SignIn')),
  Register: lazy(() => import('../screens/learner/Register')),
  Dashboard: lazy(() => import('../screens/learner/Dashboard')),
  CourseMap: lazy(() => import('../screens/learner/CourseMap')),
  Lesson: lazy(() => import('../screens/learner/Lesson')),
  Catalog: lazy(() => import('../screens/learner/Catalog')),
  TopicDetail: lazy(() => import('../screens/learner/TopicDetail')),
  Projects: lazy(() => import('../screens/learner/Projects')),
  Assessment: lazy(() => import('../screens/learner/Assessment')),
  Competitions: lazy(() => import('../screens/learner/Competitions')),
  Profile: lazy(() => import('../screens/learner/Profile')),
  ProjectBuilder: lazy(() => import('../screens/admin/ProjectBuilder')),
  Users: lazy(() => import('../screens/admin/Users')),
  Analytics: lazy(() => import('../screens/admin/Analytics')),
  Monitoring: lazy(() => import('../screens/admin/Monitoring')),
};
