'use client';

import { useState } from 'react';

const alerts = [
  { id: 1, level: 'Confirmed', tone: 'red', title: 'Planned maintenance outage', area: 'North Austin, TX', utility: 'Austin Energy', start: 'Today, 10:00 PM', end: 'Tomorrow, 2:00 AM', details: 'Scheduled equipment work is expected to affect approximately 1,800 homes. Restoration timing may change as work progresses.' },
  { id: 2, level: 'Likely', tone: 'amber', title: 'Storm-related outage risk', area: 'Palm Beach County, FL', utility: 'FPL', start: 'Tomorrow, 5:00 PM', end: 'Tomorrow, 11:00 PM', details: 'Strong winds and thunderstorms may damage distribution lines. This is an estimate, not a confirmed outage.' },
  { id: 3, level: 'Active', tone: 'blue', title: 'Unplanned outage', area: 'Downtown Portland, OR', utility: 'Portland General Electric', start: 'Started 28 minutes ago', end: 'Estimated: 1:30 PM', details: 'Utility crews are responding to a reported equipment fault. This status is updated from the official utility feed.' },
];

const initialLocations = ['North Austin, TX', 'Downtown Austin, TX', 'Lakeway, TX'];

type Panel = 'locations' | 'preferences' | 'history' | null;

export default function Page() {
  const [selected, setSelected] = useState(alerts[0]);
  const [filter, setFilter] = useState('All alerts');
  const [panel, setPanel] = useState<Panel>(null);
  const [locations, setLocations] = useState(initialLocations);
  const [newLocation, setNewLocation] = useState('');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [leadTime, setLeadTime] = useState('60');
  const [severity, setSeverity] = useState('Likely');
  const [notified, setNotified] = useState(false);

  const visibleAlerts = filter === 'All alerts' ? alerts : alerts.filter((alert) => alert.level === filter);

  function addLocation() {
    const location = newLocation.trim();
    if (!location || locations.includes(location)) return;
    setLocations([...locations, location]);
    setNewLocation('');
  }

  function removeLocation(location: string) {
    setLocations(locations.filter((item) => item !== location));
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brandMark">P</span><span>PowerWatch</span></div>
        <nav>
          <button className={!panel ? 'navActive' : ''} onClick={() => setPanel(null)}>⌂ <span>Overview</span></button>
          <button className={panel === 'locations' ? 'navActive' : ''} onClick={() => setPanel('locations')}>⌖ <span>My locations</span></button>
          <button className={panel === 'history' ? 'navActive' : ''} onClick={() => setPanel('history')}>♢ <span>Alert history</span></button>
          <button className={panel === 'preferences' ? 'navActive' : ''} onClick={() => setPanel('preferences')}>⚙ <span>Preferences</span></button>
        </nav>
        <div className="safety"><strong>Emergency?</strong><span>Call 911 for immediate danger.</span></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">MONDAY, NOVEMBER 24</p><h1>Good morning, Marco</h1></div>
          <button className="profile" aria-label="Open preferences" onClick={() => setPanel('preferences')}>M</button>
        </header>

        <div className="statusStrip"><span className="pulse" /><strong>Watching {locations.length} saved {locations.length === 1 ? 'location' : 'locations'}</strong><span>Last updated just now</span></div>

        <div className="toolbar">
          <h2>Alerts near you</h2>
          <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter alerts">
            <option>All alerts</option><option>Confirmed</option><option>Likely</option><option>Active</option>
          </select>
        </div>

        <div className="layout">
          <div className="alertList">
            {visibleAlerts.length === 0 ? <div className="empty">No alerts match this filter.</div> : visibleAlerts.map((alert) => (
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
            <div className="detailHead"><span className={`badge ${selected.tone}`}>{selected.level}</span><button aria-label="Clear selection" onClick={() => setSelected(alerts[0])}>×</button></div>
            <h2>{selected.title}</h2>
            <p className="location">⌖ {selected.area}</p>
            <div className="detailGrid"><div><span>Starts</span><strong>{selected.start}</strong></div><div><span>Ends</span><strong>{selected.end}</strong></div></div>
            <h3>What to expect</h3><p>{selected.details}</p>
            <div className="source"><span>Official source</span><strong>{selected.utility}</strong></div>
            <button className={`primary ${notified ? 'confirmed' : ''}`} onClick={() => setNotified(!notified)}>{notified ? 'Notification enabled ✓' : 'Notify me'}</button>
          </article>
        </div>
      </section>

      {panel && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setPanel(null); }}>
        <section className="panel" role="dialog" aria-modal="true" aria-label={panel === 'locations' ? 'My locations' : panel === 'preferences' ? 'Notification preferences' : 'Alert history'}>
          <div className="panelHead"><div><p className="eyebrow">POWERWATCH</p><h2>{panel === 'locations' ? 'My locations' : panel === 'preferences' ? 'Notification preferences' : 'Alert history'}</h2></div><button className="close" onClick={() => setPanel(null)}>×</button></div>

          {panel === 'locations' && <>
            <p className="panelIntro">Choose the places where you want to receive outage alerts.</p>
            <div className="locationForm"><input value={newLocation} onChange={(event) => setNewLocation(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addLocation()} placeholder="Add city, ZIP code, or address" /><button onClick={addLocation}>Add</button></div>
            <div className="locationList">{locations.map((location) => <div className="locationRow" key={location}><div className="pin">⌖</div><strong>{location}</strong><button onClick={() => removeLocation(location)} aria-label={`Remove ${location}`}>Remove</button></div>)}</div>
            {locations.length === 0 && <div className="empty">Add a location to begin watching for alerts.</div>}
          </>}

          {panel === 'preferences' && <>
            <p className="panelIntro">Control how and when PowerWatch contacts you.</p>
            <div className="setting"><div><strong>Push notifications</strong><span>Send alerts to this device</span></div><button className={`switch ${pushEnabled ? 'on' : ''}`} onClick={() => setPushEnabled(!pushEnabled)}><span /></button></div>
            <div className="setting"><div><strong>SMS notifications</strong><span>Critical confirmed outages only</span></div><button className={`switch ${smsEnabled ? 'on' : ''}`} onClick={() => setSmsEnabled(!smsEnabled)}><span /></button></div>
            <div className="setting"><div><strong>Email summaries</strong><span>Receive one daily update</span></div><button className={`switch ${emailEnabled ? 'on' : ''}`} onClick={() => setEmailEnabled(!emailEnabled)}><span /></button></div>
            <div className="preferenceRow"><label>Alert me at least</label><select value={leadTime} onChange={(event) => setLeadTime(event.target.value)}><option value="15">15 minutes before</option><option value="30">30 minutes before</option><option value="60">1 hour before</option><option value="180">3 hours before</option></select></div>
            <div className="preferenceRow"><label>Minimum severity</label><select value={severity} onChange={(event) => setSeverity(event.target.value)}><option>Likely</option><option>Confirmed</option><option>Active</option></select></div>
            <button className="primary save" onClick={() => setPanel(null)}>Save preferences</button>
          </>}

          {panel === 'history' && <>
            <p className="panelIntro">Recently resolved and updated alerts.</p>
            <div className="historyList"><div><span className="badge">Recovered</span><strong>Water Street utility repair</strong><p>Seattle, WA · Resolved yesterday</p></div><div><span className="badge blue">Active</span><strong>Equipment fault monitoring</strong><p>Downtown Portland, OR · Updated 28 min ago</p></div></div>
          </>}
        </section>
      </div>}
    </main>
  );
}
