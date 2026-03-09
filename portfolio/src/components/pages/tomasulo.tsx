import React, { useState, useRef } from 'react';

const TomasuloVisualizer = () => {
  const [currentCycle, setCurrentCycle] = useState(1);
  const fileInputRef = useRef(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const createEmptyCycle = () => ({
    instructions: Array(6).fill(0).map(() => ({ op: '', issue: '', exec: '', wb: '' })),
    reservationStations: [
      { name: 'Add1', busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' },
      { name: 'Add2', busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' },
      { name: 'Add3', busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' },
      { name: 'Mult1', busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' },
      { name: 'Mult2', busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' },
    ],
    registers: { F0: '', F2: '', F4: '', F6: '', F8: '', F10: '', F12: '', F14: '', F16: '' }
  });

  const [history, setHistory] = useState({ 1: createEmptyCycle() });

  const updateHistoryForward = (callback) => {
    setHistory(prev => {
      const newHistory = { ...prev };
      const cycleKeys = Object.keys(newHistory).map(Number).filter(k => k >= currentCycle);
      cycleKeys.forEach(cycleNum => {
        newHistory[cycleNum] = callback(JSON.parse(JSON.stringify(newHistory[cycleNum])));
      });
      return newHistory;
    });
  };

  const updateField = (section, index, field, value) => {
    updateHistoryForward((cycle) => {
      if (section === 'registers') {
        cycle.registers[field] = value;
      } else {
        cycle[section][index][field] = value;
      }
      return cycle;
    });
  };

  const toggleBusy = (index) => {
    const currentVal = history[currentCycle].reservationStations[index].busy;
    updateField('reservationStations', index, 'busy', currentVal === 'Yes' ? 'No' : 'Yes');
  };

  const addRow = (section) => {
    const newRow = section === 'instructions' 
      ? { op: '', issue: '', exec: '', wb: '' }
      : { name: `RS${history[currentCycle].reservationStations.length + 1}`, busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' };

    updateHistoryForward((cycle) => {
      cycle[section] = [...cycle[section], { ...newRow }];
      return cycle;
    });
  };

  const removeRow = (section, index) => {
    updateHistoryForward((cycle) => {
      cycle[section] = cycle[section].filter((_, i) => i !== index);
      return cycle;
    });
  };

  const handleSort = (section) => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const from = dragItem.current;
    const to = dragOverItem.current;
    updateHistoryForward((cycle) => {
      const list = [...cycle[section]];
      const [removed] = list.splice(from, 1);
      list.splice(to, 0, removed);
      cycle[section] = list;
      return cycle;
    });
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const data = history[currentCycle] || createEmptyCycle();
  const allCycles = Object.keys(history).sort((a, b) => a - b);

  return (
    <div style={{ padding: '20px', maxWidth: '1600px', margin: 'auto', fontFamily: 'system-ui, sans-serif', backgroundColor: '#fdfdfd', minHeight: '100vh', paddingBottom: '100px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#2c3e50', fontSize: '22px' }}>Tomasulo Visualizer</h1>
          <p style={{ margin: '5px 0 0', color: '#7f8c8d', fontSize: '28px' }}>Active step: <strong>Cycle {currentCycle}</strong></p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (rev) => { setHistory(JSON.parse(rev.target.result)); setCurrentCycle(1); };
            reader.readAsText(file);
          }} accept=".json" />
          <button onClick={() => fileInputRef.current.click()} style={secondaryBtn}>Upload JSON</button>
          <button onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
            const a = document.createElement('a'); a.setAttribute("href", dataStr); a.setAttribute("download", `tomasulo.json`); a.click();
          }} style={secondaryBtn}>Download JSON</button>
          <button onClick={() => setCurrentCycle(Math.max(1, currentCycle - 1))} style={navBtn}>Prev</button>
          <button onClick={() => {
            const next = currentCycle + 1;
            if (!history[next]) setHistory(prev => ({ ...prev, [next]: JSON.parse(JSON.stringify(prev[currentCycle])) }));
            setCurrentCycle(next);
          }} style={{ ...navBtn, backgroundColor: '#3498db', color: 'white', border: 'none' }}>Next Cycle</button>
        </div>
      </header>

      {/* Main Content: Side-by-Side Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '30px' }}>
        
        {/* Instruction Status - Narrowed */}
        <TableSection title="Instruction Status" headers={['Instruction', 'Issue', 'Exec', 'WB', '']} onAdd={() => addRow('instructions')}>
          {data.instructions.map((inst, i) => (
            <tr key={i} draggable onDragStart={() => (dragItem.current = i)} onDragEnter={() => (dragOverItem.current = i)} onDragEnd={() => handleSort('instructions')} onDragOver={(e) => e.preventDefault()} style={{ ...rowStyle, backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
              <td><input style={inputStyle} value={inst.op} onChange={e => updateField('instructions', i, 'op', e.target.value)} placeholder="LD F6 34 R2" /></td>
              <td style={{ width: '50px' }}><input style={inputStyle} value={inst.issue} onChange={e => updateField('instructions', i, 'issue', e.target.value)} /></td>
              <td style={{ width: '50px' }}><input style={inputStyle} value={inst.exec} onChange={e => updateField('instructions', i, 'exec', e.target.value)} /></td>
              <td style={{ width: '50px' }}><input style={inputStyle} value={inst.wb} onChange={e => updateField('instructions', i, 'wb', e.target.value)} /></td>
              <td style={{ width: '30px', textAlign: 'center' }}><button onClick={() => removeRow('instructions', i)} style={removeBtnStyle}>×</button></td>
            </tr>
          ))}
        </TableSection>

        {/* Reservation Stations - Wide */}
        <TableSection title="Reservation Stations" headers={['Name', 'Busy', 'Op', 'Vj', 'Vk', 'Qj', 'Qk', 'Addr', '']} onAdd={() => addRow('reservationStations')}>
          {data.reservationStations.map((rs, i) => (
            <tr key={i} draggable onDragStart={() => (dragItem.current = i)} onDragEnter={() => (dragOverItem.current = i)} onDragEnd={() => handleSort('reservationStations')} onDragOver={(e) => e.preventDefault()} style={{ ...rowStyle, backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
              <td style={{ width: '80px' }}><input style={{...inputStyle, fontWeight: 'bold'}} value={rs.name} onChange={e => updateField('reservationStations', i, 'name', e.target.value)} /></td>
              <td style={{ width: '60px', textAlign: 'center' }}>
                <button onClick={() => toggleBusy(i)} style={{ ...busyToggleStyle, backgroundColor: rs.busy === 'Yes' ? '#fab1a0' : '#f1f2f6', color: rs.busy === 'Yes' ? '#d63031' : '#2d3436' }}>{rs.busy}</button>
              </td>
              {['op', 'vj', 'vk', 'qj', 'qk', 'addr'].map(f => (
                <td key={f}><input style={inputStyle} value={rs[f]} onChange={e => updateField('reservationStations', i, f, e.target.value)} /></td>
              ))}
              <td style={{ width: '30px', textAlign: 'center' }}><button onClick={() => removeRow('reservationStations', i)} style={removeBtnStyle}>×</button></td>
            </tr>
          ))}
        </TableSection>
      </div>

      {/* Register Status */}
      <div style={{ marginTop: '20px' }}>
        <h3 style={labelStyle}>Register Status (Qi)</h3>
        <table style={tableMainStyle}>
          <thead>
            <tr style={headerRowStyle}>
              {Object.keys(data.registers).map(reg => <th key={reg} style={{ padding: '8px', borderRight: '1px solid #444' }}>{reg}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(data.registers).map(reg => (
                <td key={reg} style={cellStyle}><input style={inputStyle} value={data.registers[reg]} onChange={e => updateField('registers', null, reg, e.target.value)} /></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <footer style={timelineStyle}>
        <span style={{ fontSize: '11px', color: '#636e72', marginRight: '10px' }}>TIMELINE:</span>
        {allCycles.map(c => (
          <button key={c} onClick={() => setCurrentCycle(Number(c))} style={{ ...timelineBtn, backgroundColor: currentCycle === Number(c) ? '#3498db' : 'white', color: currentCycle === Number(c) ? 'white' : '#2d3436' }}>{c}</button>
        ))}
      </footer>
    </div>
  );
};

const TableSection = ({ title, headers, children, onAdd }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <h3 style={{ ...labelStyle, margin: 0 }}>{title}</h3>
      <button onClick={onAdd} style={addBtnStyle}>+ Add Row</button>
    </div>
    <table style={tableMainStyle}>
      <thead>
        <tr style={headerRowStyle}>{headers.map(h => <th key={h} style={{ padding: '8px', borderRight: '1px solid #444' }}>{h}</th>)}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

// --- Styles ---
const tableMainStyle = { width: '100%', borderCollapse: 'collapse', border: '1px solid #dfe6e9', backgroundColor: 'white' };
const headerRowStyle = { backgroundColor: '#2d3436', color: 'white', fontSize: '12px' };
const cellStyle = { border: '1px solid #f1f2f6' };
const rowStyle = { cursor: 'grab' };
const inputStyle = { width: '100%', border: 'none', padding: '10px 4px', textAlign: 'center', outline: 'none', fontSize: '15px', boxSizing: 'border-box', background: 'transparent' };
const labelStyle = { fontSize: '11px', color: '#636e72', textTransform: 'uppercase', letterSpacing: '0.5px' };
const navBtn = { padding: '6px 15px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', border: '1px solid #ccc', backgroundColor: 'white' };
const secondaryBtn = { padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', border: '1px solid #dfe6e9', backgroundColor: '#f9f9f9' };
const addBtnStyle = { padding: '3px 8px', fontSize: '10px', cursor: 'pointer', backgroundColor: '#e1f5fe', border: '1px solid #81d4fa', borderRadius: '4px', color: '#0288d1' };
const removeBtnStyle = { background: 'none', border: 'none', color: '#ff7675', cursor: 'pointer', fontSize: '16px' };
const busyToggleStyle = { border: 'none', borderRadius: '3px', padding: '3px 8px', cursor: 'pointer', fontSize: '11px', width: '45px' };
const timelineStyle = { position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #eee', padding: '10px 20px', display: 'flex', gap: '5px', overflowX: 'auto', alignItems: 'center' };
const timelineBtn = { minWidth: '30px', height: '30px', borderRadius: '3px', border: '1px solid #dfe6e9', cursor: 'pointer', fontSize: '12px' };

export default TomasuloVisualizer;