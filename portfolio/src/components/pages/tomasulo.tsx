import React, { useState, useRef, useEffect, type ChangeEvent } from 'react';

// --- Interfaces ---
interface Instruction { op: string; issue: string; exec: string; wb: string; }
interface ReservationStation { name: string; busy: string; op: string; vj: string; vk: string; qj: string; qk: string; addr: string; [key: string]: string; }
interface RegisterEntry { name: string; value: string; }
interface CycleData { instructions: Instruction[]; reservationStations: ReservationStation[]; registers: RegisterEntry[]; }
interface HistoryState { [key: number]: CycleData; }

const STORAGE_KEY = 'tomasulo_data';

const TomasuloVisualizer: React.FC = () => {
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const txtInputRef = useRef<HTMLInputElement>(null);

  const createEmptyCycle = (): CycleData => ({
    instructions: [],
    reservationStations: [
      { name: 'Add1', busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' },
      { name: 'Add2', busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' },
      { name: 'Mult1', busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' },
    ],
    registers: [
      { name: 'F0', value: '' }, { name: 'F2', value: '' }, { name: 'F4', value: '' },
      { name: 'F6', value: '' }, { name: 'F8', value: '' }, { name: 'F10', value: '' }
    ]
  });

  const [history, setHistory] = useState<HistoryState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return { 1: createEmptyCycle() };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const resetStorage = () => {
    if (window.confirm("Are you sure you want to clear all data and reset the visualizer?")) {
      setHistory({ 1: createEmptyCycle() });
      setCurrentCycle(1);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // --- Helper: Updates only the cycle currently on screen ---
  const updateCurrentCycle = (callback: (cycle: CycleData) => CycleData) => {
    setHistory(prev => ({
      ...prev,
      [currentCycle]: callback(JSON.parse(JSON.stringify(prev[currentCycle])))
    }));
  };

  // --- Helper: Updates current cycle AND all subsequent cycles ---
  const updateHistoryForward = (callback: (cycle: CycleData) => CycleData) => {
    setHistory(prev => {
      const newHistory = { ...prev };
      const cycleKeys = Object.keys(newHistory).map(Number).filter(k => k >= currentCycle);
      cycleKeys.forEach(cycleNum => {
        newHistory[cycleNum] = callback(JSON.parse(JSON.stringify(newHistory[cycleNum])));
      });
      return newHistory;
    });
  };

  const updateField = (section: keyof CycleData, index: number, field: string, value: string) => {
    // Instruction fields ripple forward; everything else is local to the cycle
    const isForwardPersistent = section === 'instructions';

    if (isForwardPersistent) {
      updateHistoryForward((cycle) => {
        const target = cycle[section] as any[];
        if (target[index]) target[index][field] = value;
        return cycle;
      });
    } else {
      updateCurrentCycle((cycle) => {
        const target = cycle[section] as any[];
        if (target[index]) target[index][field] = value;
        return cycle;
      });
    }
  };

  const addRow = (section: keyof CycleData) => {
    // Adding rows to instructions should also be forward persistent to maintain table structure
    const updateFn = section === 'instructions' ? updateHistoryForward : updateCurrentCycle;
    
    updateFn((cycle) => {
      if (section === 'instructions') {
        cycle.instructions.push({ op: '', issue: '', exec: '', wb: '' });
      } else if (section === 'reservationStations') {
        cycle.reservationStations.push({ name: `RS${cycle.reservationStations.length + 1}`, busy: 'No', op: '', vj: '', vk: '', qj: '', qk: '', addr: '' });
      } else if (section === 'registers') {
        cycle.registers.push({ name: `R${cycle.registers.length}`, value: '' });
      }
      return cycle;
    });
  };

  const removeRow = (section: keyof CycleData, index: number) => {
    const updateFn = section === 'instructions' ? updateHistoryForward : updateCurrentCycle;
    updateFn((cycle) => {
      const target = cycle[section] as any[];
      target.splice(index, 1);
      return cycle;
    });
  };

  const toggleBusy = (index: number) => {
    const currentVal = history[currentCycle].reservationStations[index].busy;
    updateField('reservationStations', index, 'busy', currentVal === 'Yes' ? 'No' : 'Yes');
  };

  const handleTxtUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (rev) => {
      const content = rev.target?.result;
      if (typeof content === 'string') {
        const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
        // Importing instructions is forward persistent
        updateHistoryForward((cycle) => {
          const newInstructions = lines.map(line => ({ op: line.trim(), issue: '', exec: '', wb: '' }));
          cycle.instructions = [...cycle.instructions, ...newInstructions];
          return cycle;
        });
      }
    };
    reader.readAsText(file);
  };

  const handleJsonUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (rev) => {
      if (typeof rev.target?.result === 'string') {
        setHistory(JSON.parse(rev.target.result));
        setCurrentCycle(1);
      }
    };
    reader.readAsText(file);
  };

  const data = history[currentCycle] || history[1];
  const allCycles = Object.keys(history).map(Number).sort((a, b) => a - b);

  return (
    <div style={{ padding: '20px', maxWidth: '1600px', margin: 'auto', fontFamily: 'system-ui, sans-serif', backgroundColor: '#fdfdfd', minHeight: '100vh', paddingBottom: '120px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#2c3e50', fontSize: '22px' }}>Tomasulo Visualizer</h1>
          <p style={{ margin: '5px 0 0', color: '#7f8c8d', fontSize: '14px' }}>Active step: <strong>Cycle {currentCycle}</strong></p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={resetStorage} style={{ ...secondaryBtn, backgroundColor: '#fff5f5', color: '#c53030', borderColor: '#feb2b2' }}>Reset All</button>
          <input type="file" ref={txtInputRef} style={{ display: 'none' }} onChange={handleTxtUpload} />
          <button onClick={() => txtInputRef.current?.click()} style={{ ...secondaryBtn, backgroundColor: '#f0fdf4', color: '#166534' }}>Import asm</button>
          <input type="file" ref={jsonInputRef} style={{ display: 'none' }} onChange={handleJsonUpload} accept=".json" />
          <button onClick={() => jsonInputRef.current?.click()} style={secondaryBtn}>Load JSON</button>
          <button onClick={() => {
             const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
             const a = document.createElement('a'); a.href = dataStr; a.download = `tomasulo.json`; a.click();
          }} style={secondaryBtn}>Save JSON</button>
          
          <div style={{ width: '1px', height: '30px', backgroundColor: '#ddd', margin: '0 5px' }} />
          
          <button onClick={() => setCurrentCycle(Math.max(1, currentCycle - 1))} style={navBtn}>Prev</button>
          <button onClick={() => {
            const next = currentCycle + 1;
            if (!history[next]) {
              setHistory(prev => ({ 
                ...prev, 
                [next]: JSON.parse(JSON.stringify(prev[currentCycle])) 
              }));
            }
            setCurrentCycle(next);
          }} style={{ ...navBtn, backgroundColor: '#3498db', color: 'white', border: 'none' }}>Next Cycle</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '30px' }}>
        <TableSection title="Instruction Status" headers={['Instruction', 'Issue', 'Exec', 'WB', '']} onAdd={() => addRow('instructions')}>
          {data.instructions.map((inst, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
              <td><input style={inputStyle} value={inst.op} onChange={e => updateField('instructions', i, 'op', e.target.value)} /></td>
              <td style={{ width: '60px' }}><input style={inputStyle} value={inst.issue} onChange={e => updateField('instructions', i, 'issue', e.target.value)} /></td>
              <td style={{ width: '60px' }}><input style={inputStyle} value={inst.exec} onChange={e => updateField('instructions', i, 'exec', e.target.value)} /></td>
              <td style={{ width: '60px' }}><input style={inputStyle} value={inst.wb} onChange={e => updateField('instructions', i, 'wb', e.target.value)} /></td>
              <td style={{ textAlign: 'center' }}><button onClick={() => removeRow('instructions', i)} style={removeBtnStyle}>×</button></td>
            </tr>
          ))}
        </TableSection>

        <TableSection title="Reservation Stations" headers={['Name', 'Busy', 'Op', 'Vj', 'Vk', 'Qj', 'Qk', 'Addr', '']} onAdd={() => addRow('reservationStations')}>
          {data.reservationStations.map((rs, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
              <td><input style={{...inputStyle, fontWeight: 'bold'}} value={rs.name} onChange={e => updateField('reservationStations', i, 'name', e.target.value)} /></td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => toggleBusy(i)} style={{ ...busyToggleStyle, backgroundColor: rs.busy === 'Yes' ? '#fab1a0' : '#f1f2f6', color: rs.busy === 'Yes' ? '#d63031' : '#2d3436' }}>{rs.busy}</button>
              </td>
              {['op', 'vj', 'vk', 'qj', 'qk', 'addr'].map(f => (
                <td key={f}><input style={inputStyle} value={rs[f]} onChange={e => updateField('reservationStations', i, f, e.target.value)} /></td>
              ))}
              <td style={{ textAlign: 'center' }}><button onClick={() => removeRow('reservationStations', i)} style={removeBtnStyle}>×</button></td>
            </tr>
          ))}
        </TableSection>
      </div>

      <TableSection title="Register Status (Qi)" headers={[]} onAdd={() => addRow('registers')}>
        <div style={{ display: 'flex', overflowX: 'auto', border: '1px solid #dfe6e9', borderRadius: '4px' }}>
          {data.registers.map((reg, i) => (
            <div key={i} style={{ minWidth: '80px', borderRight: '1px solid #dfe6e9', backgroundColor: 'white' }}>
              <div style={{ backgroundColor: '#2d3436', color: 'white', padding: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <input 
                  style={{ ...inputStyle, color: 'white', fontSize: '11px', textAlign: 'left', padding: '2px' }} 
                  value={reg.name} 
                  onChange={e => updateField('registers', i, 'name', e.target.value)} 
                />
                <button onClick={() => removeRow('registers', i)} style={{ background: 'none', border: 'none', color: '#ff7675', cursor: 'pointer', fontSize: '10px', padding: '0 2px' }}>×</button>
              </div>
              <input 
                style={inputStyle} 
                value={reg.value} 
                onChange={e => updateField('registers', i, 'value', e.target.value)} 
                placeholder="Qi"
              />
            </div>
          ))}
        </div>
      </TableSection>

      <footer style={timelineStyle}>
        <span style={{ fontSize: '11px', color: '#636e72', marginRight: '10px' }}>TIMELINE:</span>
        {allCycles.map(c => (
          <button key={c} onClick={() => setCurrentCycle(c)} style={{ ...timelineBtn, backgroundColor: currentCycle === c ? '#3498db' : 'white', color: currentCycle === c ? 'white' : '#2d3436' }}>{c}</button>
        ))}
      </footer>
    </div>
  );
};

// --- Helper Components & Styles ---
const TableSection: React.FC<{title: string, headers: string[], children: React.ReactNode, onAdd: () => void}> = ({ title, headers, children, onAdd }) => (
  <div style={{ marginBottom: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <h3 style={{ ...labelStyle, margin: 0 }}>{title}</h3>
      <button onClick={onAdd} style={addBtnStyle}>+ Add {title.includes('Register') ? 'Register' : 'Row'}</button>
    </div>
    {headers.length > 0 ? (
      <table style={tableMainStyle}>
        <thead>
          <tr style={headerRowStyle}>{headers.map(h => <th key={h} style={{ padding: '8px', borderRight: '1px solid #444' }}>{h}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    ) : children}
  </div>
);

const tableMainStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', border: '1px solid #dfe6e9' };
const headerRowStyle: React.CSSProperties = { backgroundColor: '#2d3436', color: 'white', fontSize: '12px' };
const inputStyle: React.CSSProperties = { width: '100%', border: 'none', padding: '8px 4px', textAlign: 'center', outline: 'none', fontSize: '13px', boxSizing: 'border-box', background: 'transparent' };
const labelStyle: React.CSSProperties = { fontSize: '11px', color: '#636e72', textTransform: 'uppercase', letterSpacing: '0.5px' };
const navBtn: React.CSSProperties = { padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', border: '1px solid #ccc', backgroundColor: 'white' };
const secondaryBtn: React.CSSProperties = { padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', border: '1px solid #dfe6e9', backgroundColor: '#f9f9f9' };
const addBtnStyle: React.CSSProperties = { padding: '3px 8px', fontSize: '10px', cursor: 'pointer', backgroundColor: '#e1f5fe', border: '1px solid #81d4fa', borderRadius: '4px', color: '#0288d1' };
const removeBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: '#ff7675', cursor: 'pointer', fontSize: '16px' };
const busyToggleStyle: React.CSSProperties = { border: 'none', borderRadius: '3px', padding: '3px 8px', cursor: 'pointer', fontSize: '11px', width: '45px' };
const timelineStyle: React.CSSProperties = { position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #eee', padding: '10px 20px', display: 'flex', gap: '5px', overflowX: 'auto', alignItems: 'center', zIndex: 100 };
const timelineBtn: React.CSSProperties = { minWidth: '30px', height: '30px', borderRadius: '3px', border: '1px solid #dfe6e9', cursor: 'pointer', fontSize: '12px' };

export default TomasuloVisualizer;