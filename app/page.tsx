'use client';

import { useState } from 'react';

const alerts = [
  {
    id: 1,
    level: 'Confirmed',
    tone: 'red',
    title: 'Planned maintenance outage',
    area: 'North Austin, TX',
    utility: 'Austin Energy',
    start: 'Today, 10:00 PM',
    end: 'Tomorrow, 2:00 AM',
    details: 'Scheduled equipment work is expected to affect approximately 1,800 homes. Restoration timing may change as work progresses.',
  },
  {
    id: 2,
    level: 'Likely',
    tone: 'amber',
    title: 'Storm-related outage risk',
    area: 'Palm Beach County, FL',
    utility: 'FPL',
    start: 'Tomorrow, 5:00 PM',
    end: 'Tomorrow, 11:00 PM',
    details: 'Strong winds and thunderstorms may damage distribution lines. This is an estimate, not a confirmed outage.',
  },
  {
    id: 3,
    level: 'Active',
    tone: 'blue',
    title: 'Unplanned outage',
    area: 'Downtown Portland, OR',
    utility: 'Portland General Electric',
    start: 'Started 28 minutes ago',
    end: 'Estimated: 1:30 PM',
    details: 'Utility crews are responding to a reported equipment fault. This status is updated from the official utility feed.',
  },
];

export default function Page() {
  const [selected, setSelected] = useState(alerts[0]);
  const [filter, setFilter] = useState('All alerts');
  const visibleAlerts = filter === 'All alerts' ? alerts : alerts.filter((a) => a.level === filter);

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brandMark">P</span><span>PowerWatch</span></div>
        <nav>
          <button className="navActive">⌂ <span>Overview</span></button>
          <button>⌖ <span>My locations</span></button>
          <button>♢ <span>Alert history</span></button>
          <button>⚙ <span>Preferences</span></button>
        </nav>
        <div className="safety"><strong>Emergency?</strong><span>Call 911 for immediate danger.</span></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">MONDAY, NOVEMBER 24</p><h1>Good morning, Marco</h1></div>
          <button className="profile">M</button>
        </header>

        <div className="statusStrip"><span className="pulse" /><strong>Watching 3 saved locations</strong><span>Last updated just now</span></div>

        <div className="toolbar">
          <h2>Alerts near you</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter alerts">
            <option>All alerts</option><option>Confirmed</option><option>Likely</option><option>Active</option>
          </select>
        </div>

        <div className="layout">
          <div className="alertList">
            {visibleAlerts.map((alert) => (
              <button className={`alertCard ${selected.id === alert.id ? 'selected' : ''}`} key={alert.id} onClick={() => setSelected(alert)}>
                <div className={`alertIcon ${alert.tone}`}>{alert.tone === 'red' ? '!' : alert.tone === 'amber' ? '↗' : '●'}</div>
                <div className="alertInfo">
                  <span className={`badge ${alert.tone}`}>{alert.level}</span>
                  <h3>{alert.title}</h3>
                  <p>{alert.area} · {alert.utility}</p>
                  <div className="times"><strong>{alert.start}</strong><span>until {alert.end}</span></div>
                </div>
              </button>
            ))}
          </div>

          <article className="detail">
            <div className="detailHead"><span className={`badge ${selected.tone}`}>{selected.level}</span><button aria-label="Close details">×</button></div>
            <h2>{selected.title}</h2>
            <p className="location">⌖ {selected.area}</p>
            <div className="detailGrid">
              <div><span>Starts</span><strong>{selected.start}</strong></div>
              <div><span>Ends</span><strong>{selected.end}</strong></div>
            </div>
            <h3>What to expect</h3>
            <p>{selected.details}</p>
            <div className="source"><span>Official source</span><strong>{selected.utility}</strong></div>
            <button className="primary">Notify me</button>
          </article>
        </div>
      </section>
    </main>
  );
}
