// Learn how to customize the theme: https://rspress.rs/guide/basic/custom-theme

import { Layout as BasicLayout } from '@rspress/core/theme-original';
import './index.css';

const Layout = () => <BasicLayout afterNavTitle={<div className='rp-nav__others'><div className='rp-nav-menu__divider' />World 00</div>} />;

export { Layout };
export * from '@rspress/core/theme-original';
