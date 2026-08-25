import {
  Bell, ChevronDown, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Search, ShieldCheck, Wifi, X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { navItems, portalContent } from '../data/platform';
import { clearSession, getSession } from '../lib/api';
import type { PortalKey } from '../types';
import { AIAssistant } from './AIAssistant';
import { Brand } from './Brand';

const notifications = [
  { severity: 'warning', title: 'Red Flag conditions elevated', time: '2 min', detail: 'North Valley wind model updated.' },
  { severity: 'nominal', title: 'Property inspection passed', time: '18 min', detail: 'HS-4821 evidence package available.' },
  { severity: 'advisory', title: 'Firmware cohort ready', time: '1 hr', detail: '142 edge nodes await approved window.' },
];

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const session = getSession();
  const portal = (location.pathname.split('/').pop() || 'command') as PortalKey;
  const title = portalContent[portal]?.title || 'PYREXAI';
  const groups = useMemo(() => [...new Set(navItems.map((item) => item.group))], []);

  function logout() { clearSession(); navigate('/login'); }

  return (
    <div className={`app-shell ${collapsed ? 'app-shell--collapsed' : ''}`}>
      <button className="mobile-menu-button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu /></button>
      <aside className={`sidebar ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>
        <div className="sidebar__head"><Brand compact={collapsed} /><button className="sidebar__collapse desktop-only" aria-label="Collapse navigation" onClick={() => setCollapsed((value) => !value)}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</button><button className="icon-button mobile-only" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X /></button></div>
        {!collapsed && <div className="sidebar__site"><span className="sidebar__site-icon"><ShieldCheck /></span><span><small>ACTIVE NETWORK</small><strong>West operations</strong></span><ChevronDown /></div>}
        <nav className="sidebar__nav" aria-label="Application navigation">
          {groups.map((group) => <div className="nav-group" key={group}>{!collapsed && <span className="nav-group__label">{group}</span>}{navItems.filter((item) => item.group === group).map(({ key, label, icon: Icon }) => <NavLink key={key} to={`/app/${key}`} onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'} title={collapsed ? label : undefined}><Icon size={18} strokeWidth={1.8} />{!collapsed && <span>{label}</span>}{key === 'command' && !collapsed && <i className="nav-live">LIVE</i>}</NavLink>)}</div>)}
        </nav>
        <div className="sidebar__profile">
          <div className="profile-avatar">AW</div>{!collapsed && <span><strong>{session?.user.name || 'Alex Wilkerson'}</strong><small>{session?.user.organization || 'PYREXAI Demo'}</small></span>}<button className="icon-button" aria-label="Sign out" title="Sign out" onClick={logout}><LogOut size={16} /></button>
        </div>
      </aside>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <div className="app-workspace">
        <header className="topbar">
          <div><span className="topbar__crumb">PYREXAI / OPERATIONS</span><h1>{title}</h1></div>
          <div className="topbar__actions">
            <label className="topbar__search"><Search size={15} /><input aria-label="Search platform" placeholder="Search nodes, sites, incidents…" /></label>
            <span className="connection-pill"><Wifi size={13} /> NETWORK LIVE</span>
            <button className="notification-button" aria-label="Open notifications" onClick={() => setNotificationsOpen(true)}><Bell size={18} /><i>3</i></button>
          </div>
        </header>
        <main className="app-main"><Outlet /></main>
      </div>
      <AIAssistant />
      {notificationsOpen && <><button className="drawer-scrim" aria-label="Close notifications" onClick={() => setNotificationsOpen(false)} /><aside className="notification-drawer" aria-label="Notification center"><div className="drawer-head"><div><span className="section-index">OPERATIONS</span><h2>Notification center</h2></div><button className="icon-button" aria-label="Close notifications" onClick={() => setNotificationsOpen(false)}><X /></button></div><div className="notification-list">{notifications.map((item) => <article key={item.title}><i className={`status-dot status-dot--${item.severity}`} /><div><strong>{item.title}</strong><p>{item.detail}</p><span>{item.time} ago</span></div></article>)}</div><button className="button button--line notification-all">View all activity</button></aside></>}
    </div>
  );
}
