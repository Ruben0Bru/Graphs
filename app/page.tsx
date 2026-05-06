'use client'
import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';

type GrafoActivo = 'grafo1' | 'grafo2';
type Operacion = 'ninguna' | 'g3' | 'g4' | 'union' | 'interseccion' | 'anillos' | 'fusion' | 'adicion';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  
  const [grafoActivo, setGrafoActivo] = useState<GrafoActivo>('grafo1');
  const [operacionActiva, setOperacionActiva] = useState<Operacion>('ninguna');

  useEffect(() => {
    // ==========================================
    // CAPA DE DATOS MAESTRA (Grafo 1 Inmutable)
    // ==========================================
    const nodesG1 = [
      { id: 'San Carlos', label: 'San Carlos' }, { id: 'Cerete', label: 'Cerete' }, { id: 'Monteria', label: 'Monteria' }, { id: 'San Pelayo', label: 'San Pelayo' }, { id: 'Cienaga de Oro', label: 'Cienaga de Oro' }, { id: 'Puerto Escondido', label: 'Puerto Escondido' }, { id: 'Moñitos', label: 'Moñitos' }, { id: 'San Bernardo del Viento', label: 'San Bernardo del Viento' }, { id: 'Lorica', label: 'Lorica' }, { id: 'Cotorra', label: 'Cotorra' }, { id: 'Chima', label: 'Chima' }, { id: 'Momil', label: 'Momil' }, { id: 'Purisima', label: 'Purisima' }, { id: 'San Antero', label: 'San Antero' }, { id: 'San Andres de Sotavento', label: 'San Andres de Sotavento' }, { id: 'Tuchin', label: 'Tuchin' }, { id: 'Chinu', label: 'Chinu' }, { id: 'Sahagun', label: 'Sahagun' }, { id: 'Pueblo Nuevo', label: 'Pueblo Nuevo' },
      { id: 'Ayapel', label: 'Ayapel' }, { id: 'La Apartada', label: 'La Apartada' }, { id: 'Caucasia', label: 'Caucasia' }, { id: 'Nechi', label: 'Nechi' }, { id: 'Caceres', label: 'Caceres' }, { id: 'El Bagre', label: 'El Bagre' }, { id: 'Zaragoza', label: 'Zaragoza' }, { id: 'Anori', label: 'Anori' },
      { id: 'Segovia', label: 'Segovia' }, { id: 'Amalfi', label: 'Amalfi' }, { id: 'Remedios', label: 'Remedios' }, { id: 'Vegachi', label: 'Vegachi' }, { id: 'Puerto Berrio', label: 'Puerto Berrio' }, { id: 'Yali', label: 'Yali' }, { id: 'Yondo', label: 'Yondo' },
      { id: 'Yolombo', label: 'Yolombo' }, { id: 'Gomez Plata', label: 'Gomez Plata' }, { id: 'Maceo', label: 'Maceo' }, { id: 'San Roque', label: 'San Roque' }, { id: 'Santo Domingo', label: 'Santo Domingo' }, { id: 'Alejandria', label: 'Alejandria' }, { id: 'Santa Rosa de Osos', label: 'Santa Rosa de Osos' }, { id: 'Entrerrios', label: 'Entrerrios' }, { id: 'San Pedro', label: 'San Pedro' }, { id: 'Barbosa', label: 'Barbosa' }, { id: 'Girardota', label: 'Girardota' }, { id: 'Copacabana', label: 'Copacabana' }, { id: 'Bello', label: 'Bello' }, { id: 'Medellin', label: 'Medellin' }, { id: 'Guarne', label: 'Guarne' }, { id: 'Rionegro', label: 'Rionegro' }, { id: 'Marinilla', label: 'Marinilla' }, { id: 'Peñol', label: 'Peñol' }, { id: 'Guatape', label: 'Guatape' }
    ];

    const edgesG1 = [
      { from: 'San Carlos', to: 'Cerete', label: '15 km' }, { from: 'Cerete', to: 'Monteria', label: '18 km' }, { from: 'Cerete', to: 'San Pelayo', label: '15 km' }, { from: 'Cerete', to: 'Cienaga de Oro', label: '20 km' }, { from: 'Monteria', to: 'San Pelayo', label: '25 km' }, { from: 'Monteria', to: 'Puerto Escondido', label: '60 km' }, { from: 'Puerto Escondido', to: 'Moñitos', label: '30 km' }, { from: 'Puerto Escondido', to: 'Lorica', label: '45 km' }, { from: 'Moñitos', to: 'San Bernardo del Viento', label: '25 km' }, { from: 'Moñitos', to: 'Lorica', label: '40 km' }, { from: 'San Bernardo del Viento', to: 'Lorica', label: '35 km' }, { from: 'San Bernardo del Viento', to: 'San Antero', label: '30 km' }, { from: 'San Pelayo', to: 'Cotorra', label: '10 km' }, { from: 'San Pelayo', to: 'Lorica', label: '35 km' }, { from: 'Cotorra', to: 'Chima', label: '15 km' }, { from: 'Cotorra', to: 'Lorica', label: '15 km' },
      { from: 'Lorica', to: 'Chima', label: '20 km' }, { from: 'Lorica', to: 'Momil', label: '15 km' }, { from: 'Lorica', to: 'Purisima', label: '15 km' }, { from: 'Lorica', to: 'San Antero', label: '40 km' }, { from: 'Purisima', to: 'San Antero', label: '25 km' }, { from: 'Purisima', to: 'Momil', label: '10 km' }, { from: 'Momil', to: 'Chima', label: '15 km' }, { from: 'Momil', to: 'Tuchin', label: '20 km' }, { from: 'Tuchin', to: 'Chima', label: '25 km' }, { from: 'Tuchin', to: 'San Andres de Sotavento', label: '15 km' }, { from: 'Chima', to: 'San Andres de Sotavento', label: '30 km' }, { from: 'Chima', to: 'Cienaga de Oro', label: '35 km' }, { from: 'San Andres de Sotavento', to: 'Cienaga de Oro', label: '30 km' }, { from: 'San Andres de Sotavento', to: 'Chinu', label: '20 km' }, { from: 'Cienaga de Oro', to: 'Chinu', label: '25 km' }, { from: 'Cienaga de Oro', to: 'Sahagun', label: '35 km' }, { from: 'Chinu', to: 'Sahagun', label: '25 km' }, { from: 'Sahagun', to: 'Pueblo Nuevo', label: '30 km' },
      { from: 'Pueblo Nuevo', to: 'Ayapel', label: '65 km' }, { from: 'Ayapel', to: 'La Apartada', label: '40 km' }, { from: 'Ayapel', to: 'Caucasia', label: '80 km' }, { from: 'Ayapel', to: 'Nechi', label: '100 km' }, { from: 'La Apartada', to: 'Caucasia', label: '25 km' }, { from: 'La Apartada', to: 'Caceres', label: '40 km' }, { from: 'Caucasia', to: 'Nechi', label: '60 km' }, { from: 'Caucasia', to: 'Caceres', label: '30 km' }, { from: 'Caucasia', to: 'El Bagre', label: '70 km' },
      { from: 'Nechi', to: 'El Bagre', label: '45 km' }, { from: 'Caceres', to: 'Zaragoza', label: '30 km' }, { from: 'Caceres', to: 'Anori', label: '65 km' }, { from: 'El Bagre', to: 'Zaragoza', label: '25 km' }, { from: 'El Bagre', to: 'Segovia', label: '50 km' }, { from: 'Zaragoza', to: 'Segovia', label: '60 km' }, { from: 'Zaragoza', to: 'Anori', label: '55 km' }, { from: 'Zaragoza', to: 'Amalfi', label: '70 km' }, { from: 'Anori', to: 'Amalfi', label: '45 km' }, { from: 'Segovia', to: 'Amalfi', label: '40 km' }, { from: 'Segovia', to: 'Remedios', label: '15 km' }, { from: 'Amalfi', to: 'Remedios', label: '35 km' }, { from: 'Amalfi', to: 'Vegachi', label: '25 km' }, { from: 'Amalfi', to: 'Yolombo', label: '45 km' }, { from: 'Amalfi', to: 'Gomez Plata', label: '50 km' }, { from: 'Remedios', to: 'Vegachi', label: '30 km' }, { from: 'Remedios', to: 'Puerto Berrio', label: '110 km' }, { from: 'Remedios', to: 'Yali', label: '40 km' }, { from: 'Remedios', to: 'Yondo', label: '70 km' }, { from: 'Vegachi', to: 'Yolombo', label: '35 km' },
      { from: 'Yolombo', to: 'Gomez Plata', label: '30 km' }, { from: 'Yolombo', to: 'Santo Domingo', label: '35 km' }, { from: 'Yolombo', to: 'San Roque', label: '25 km' }, { from: 'Yolombo', to: 'Maceo', label: '35 km' }, { from: 'Gomez Plata', to: 'Santo Domingo', label: '30 km' }, { from: 'Maceo', to: 'San Roque', label: '25 km' }, { from: 'San Roque', to: 'Santo Domingo', label: '20 km' }, { from: 'San Roque', to: 'Santa Rosa de Osos', label: '60 km' }, { from: 'Santo Domingo', to: 'Alejandria', label: '40 km' }, { from: 'Santo Domingo', to: 'Barbosa', label: '25 km' }, { from: 'Alejandria', to: 'Peñol', label: '25 km' }, { from: 'Alejandria', to: 'Guatape', label: '20 km' }, { from: 'Santa Rosa de Osos', to: 'Entrerrios', label: '20 km' }, { from: 'Santa Rosa de Osos', to: 'San Pedro', label: '30 km' }, { from: 'Entrerrios', to: 'San Pedro', label: '15 km' }, { from: 'San Pedro', to: 'Girardota', label: '30 km' }, { from: 'San Pedro', to: 'Copacabana', label: '25 km' }, { from: 'San Pedro', to: 'Bello', label: '20 km' }, { from: 'Barbosa', to: 'Girardota', label: '15 km' }, { from: 'Girardota', to: 'Copacabana', label: '10 km' }, { from: 'Girardota', to: 'Guarne', label: '25 km' }, { from: 'Copacabana', to: 'Bello', label: '5 km' }, { from: 'Bello', to: 'Medellin', label: '10 km' }, { from: 'Guarne', to: 'Medellin', label: '20 km' }, { from: 'Guarne', to: 'Rionegro', label: '15 km' }, { from: 'Medellin', to: 'Rionegro', label: '40 km' }, { from: 'Rionegro', to: 'Marinilla', label: '10 km' }, { from: 'Marinilla', to: 'Peñol', label: '20 km' }, { from: 'Peñol', to: 'Guatape', label: '15 km' }
    ];

    // ==========================================
    // CAPA LÓGICA (Teoría de Conjuntos)
    // ==========================================
    let renderNodes: any[] = [];
    let renderEdges: any[] = [];
    let themeColor = '#00e5ff'; // Cyan base

    if (grafoActivo === 'grafo2') {
      // Inserte Grafo 2 aquí...
      renderNodes = []; 
      renderEdges = [];
      themeColor = '#39ff14'; // Verde Neón (cuando se inyecte)
    } else {
      // Definición de Subgrafos Inducidos
      const idsG3 = ['San Carlos', 'Cerete', 'Monteria', 'San Pelayo', 'Cienaga de Oro', 'Puerto Escondido', 'Moñitos', 'San Bernardo del Viento', 'Lorica', 'Cotorra', 'Chima', 'Momil', 'Purisima', 'San Antero', 'San Andres de Sotavento', 'Tuchin', 'Chinu', 'Sahagun', 'Pueblo Nuevo', 'Ayapel']; // 20 nodos
      const idsG4 = ['Sahagun', 'Pueblo Nuevo', 'Ayapel', 'La Apartada', 'Caucasia', 'Nechi', 'Caceres', 'El Bagre', 'Zaragoza', 'Anori', 'Segovia', 'Amalfi', 'Remedios', 'Vegachi', 'Yolombo', 'Puerto Berrio', 'Yali', 'Yondo']; // 18 nodos

      const getInduced = (ids: string[]) => ({
        nodes: nodesG1.filter(n => ids.includes(n.id)),
        edges: edgesG1.filter(e => ids.includes(e.from) && ids.includes(e.to))
      });

      const g3 = getInduced(idsG3);
      const g4 = getInduced(idsG4);

      // Mutador de Estado
      switch (operacionActiva) {
        case 'ninguna':
          renderNodes = nodesG1; renderEdges = edgesG1; themeColor = '#00e5ff';
          break;
        case 'g3':
          renderNodes = g3.nodes; renderEdges = g3.edges; themeColor = '#ff00ff'; // Magenta
          break;
        case 'g4':
          renderNodes = g4.nodes; renderEdges = g4.edges; themeColor = '#ff9900'; // Naranja
          break;
        case 'union': // Lógica OR (Reconstruye topología de ambas zonas)
          const unionIds = Array.from(new Set([...idsG3, ...idsG4]));
          const unionGraph = getInduced(unionIds);
          renderNodes = unionGraph.nodes; renderEdges = unionGraph.edges; themeColor = '#00ffcc';
          break;
        case 'interseccion': // Lógica AND (Extrae el Cut-Set: Sahagún, P.Nuevo, Ayapel)
          const intersectIds = idsG3.filter(id => idsG4.includes(id));
          const interGraph = getInduced(intersectIds);
          renderNodes = interGraph.nodes; renderEdges = interGraph.edges; themeColor = '#ff0000'; // Rojo
          break;
        case 'anillos': // Lógica XOR (Unión minus Aristas de Intersección)
          const uIds = Array.from(new Set([...idsG3, ...idsG4]));
          const iIds = idsG3.filter(id => idsG4.includes(id));
          renderNodes = nodesG1.filter(n => uIds.includes(n.id)); // Vértices intactos
          
          const intersectEdges = edgesG1.filter(e => iIds.includes(e.from) && iIds.includes(e.to));
          renderEdges = edgesG1
            .filter(e => uIds.includes(e.from) && uIds.includes(e.to))
            .filter(e => !intersectEdges.some(ie => ie.from === e.from && ie.to === e.to));
          themeColor = '#ffff00'; // Amarillo
          break;
        case 'fusion': // Collapse Node Pointers
          const targetId = 'Cerete-Monteria';
          renderNodes = g3.nodes.filter(n => n.id !== 'Cerete' && n.id !== 'Monteria');
          renderNodes.push({ id: targetId, label: 'Cerete-Monteria' });
          renderEdges = g3.edges.map(e => {
            let nFrom = (e.from === 'Cerete' || e.from === 'Monteria') ? targetId : e.from;
            let nTo = (e.to === 'Cerete' || e.to === 'Monteria') ? targetId : e.to;
            return { ...e, from: nFrom, to: nTo };
          }).filter(e => e.from !== e.to); // Suprime bucle auto-referenciado
          themeColor = '#aa00ff';
          break;
        case 'adicion': // Ruptura del Subgrafo inducido
          renderNodes = g3.nodes;
          renderEdges = [...g3.edges, { from: 'Monteria', to: 'Ayapel', label: '110 km (NUEVA)', dashes: true, width: 3 }];
          themeColor = '#ff00ff';
          break;
      }
    }

    // ==========================================
    // CAPA DE PRESENTACIÓN (Motor Vis.js restaurado)
    // ==========================================
    const options = {
      physics: { repulsion: { nodeDistance: 250 }, solver: 'repulsion' },
      edges: { font: { align: 'middle', color: '#aaaaaa', strokeWidth: 0, size: 12 }, color: '#555555' },
      nodes: {
        color: { background: '#1e1e1e', border: themeColor, highlight: { background: themeColor, border: '#ffffff' } },
        shape: 'dot', size: 20, borderWidth: 2,
        font: { size: 16, color: '#ffffff', face: 'Arial' }
      }
    };

    if (containerRef.current) {
      if (networkRef.current) networkRef.current.destroy();
      networkRef.current = new Network(containerRef.current, { nodes: renderNodes, edges: renderEdges }, options);
    }
  }, [grafoActivo, operacionActiva]);

  // Manejador estricto para evitar bugs de estado
  const handleGrafoChange = (ruta: GrafoActivo) => {
    setGrafoActivo(ruta);
    setOperacionActiva('ninguna');
  };

  return (
    <>
      <style>{`
        body { margin: 0; background-color: #0d1117; color: #c9d1d9; font-family: sans-serif; }
        .layout-container { display: flex; flex-direction: column; min-height: 100vh; padding: 20px; gap: 20px; max-width: 1600px; margin: 0 auto; }
        .sidebar-left, .sidebar-right { display: flex; flex-direction: column; gap: 15px; }
        .graph-area { width: 100%; height: 600px; background-color: #161b22; border-radius: 16px; border: 1px solid #30363d; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        
        .btn { padding: 15px 20px; border: none; border-radius: 8px; font-size: 15px; font-weight: bold; cursor: pointer; transition: 0.3s; text-align: left; }
        .btn-active { background-color: #58a6ff; color: #0d1117; box-shadow: 0 0 10px rgba(88, 166, 255, 0.5); }
        .btn-inactive { background-color: #21262d; color: #c9d1d9; border: 1px solid #30363d; }
        .btn-inactive:hover { background-color: #30363d; }
        
        .op-radio { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 10px; border-radius: 6px; transition: background 0.2s; }
        .op-radio:hover { background-color: #21262d; }
        .op-radio input { cursor: pointer; accent-color: #58a6ff; width: 18px; height: 18px; }
        .op-radio span { font-size: 14px; color: #c9d1d9; }
        
        .right-panel { background-color: #161b22; border: 1px solid #30363d; border-radius: 16px; padding: 20px; transition: opacity 0.3s; }
        .right-panel.disabled { opacity: 0.3; pointer-events: none; }
        
        @media (min-width: 1024px) { 
          .layout-container { flex-direction: row; padding: 30px; } 
          .sidebar-left { flex: 1.5; }
          .graph-area { flex: 5; height: 85vh; } 
          .sidebar-right { flex: 1.5; }
        }
      `}</style>

      <div className="layout-container">
        
        <div className="sidebar-left">
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 5px 0', color: '#ffffff' }}>Redes Viales</h1>
          <p style={{ color: '#8b949e', lineHeight: '1.5', fontSize: '14px' }}>
            Actividad 5: Teoría de Grafos.<br/>
            Selecciona la red base para explorar.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <button 
              className={`btn ${grafoActivo === 'grafo1' ? 'btn-active' : 'btn-inactive'}`}
              onClick={() => handleGrafoChange('grafo1')}>
              Ruta 1
            </button>
            <button 
              className={`btn ${grafoActivo === 'grafo2' ? 'btn-active' : 'btn-inactive'}`}
              onClick={() => handleGrafoChange('grafo2')}>
              Ruta 2: 
            </button>
          </div>
        </div>

        <div className="graph-area" ref={containerRef} />

        <div className={`sidebar-right right-panel ${grafoActivo === 'grafo2' ? 'disabled' : ''}`}>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 15px 0', color: '#ffffff', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
            Operaciones (Parte 1)
          </h2>
          <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '15px' }}>
            Filtros topológicos aplicados a la Ruta 1.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {[
              { id: 'ninguna', label: 'Ninguna (Topología Completa)' },
              { id: 'g3', label: 'Extraer G3 (Córdoba)' },
              { id: 'g4', label: 'Extraer G4 (Bajo Cauca)' },
              { id: 'union', label: 'a) Unión (G3 ∪ G4)' },
              { id: 'interseccion', label: 'b) Intersección (G3 ∩ G4)' },
              { id: 'anillos', label: 'c) Suma de Anillos (G3 ⊕ G4)' },
              { id: 'fusion', label: 'd) Fusión: Montería + Cereté' },
              { id: 'adicion', label: 'e) Adición de Arista a G3' }
            ].map((op) => (
              <label key={op.id} className="op-radio">
                <input 
                  type="radio" 
                  name="operacion" 
                  checked={operacionActiva === op.id} 
                  onChange={() => setOperacionActiva(op.id as Operacion)}
                />
                <span style={{ color: operacionActiva === op.id ? '#ffffff' : '#c9d1d9', fontWeight: operacionActiva === op.id ? 'bold' : 'normal' }}>
                  {op.label}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}