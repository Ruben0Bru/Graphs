'use client'
import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grafoActivo, setGrafoActivo] = useState<'grafo1' | 'grafo2'>('grafo1');

  useEffect(() => {
    // ==========================================
    // DATOS GRAFO 1: LABERINTO DEL NORDESTE
    // ==========================================
    const nodesG1 = [
      { id: 'Montería', label: 'Montería' }, { id: 'Planeta Rica', label: 'Planeta Rica' },
      { id: 'Buenavista', label: 'Buenavista' }, { id: 'La Apartada', label: 'La Apartada' },
      { id: 'Caucasia', label: 'Caucasia' }, { id: 'Montelíbano', label: 'Montelíbano' },
      { id: 'Puerto Libertador', label: 'Puerto Libertador' }, { id: 'Tarazá', label: 'Tarazá' },
      { id: 'Valdivia', label: 'Valdivia' }, { id: 'Anorí', label: 'Anorí' },
      { id: 'Amalfi', label: 'Amalfi' }, { id: 'Yolombó', label: 'Yolombó' },
      { id: 'Cisneros', label: 'Cisneros' }, { id: 'Santo Domingo', label: 'Santo Domingo' },
      { id: 'Donmatías', label: 'Donmatías' }, { id: 'Medellín', label: 'Medellín' },
      { id: 'Angostura', label: 'Angostura' }, { id: 'Guadalupe', label: 'Guadalupe' },
      { id: 'Gómez Plata', label: 'Gómez Plata' }, { id: 'Carolina del Príncipe', label: 'Carolina del P.' },
      { id: 'Santa Rosa de Osos', label: 'Santa Rosa de Osos' }, { id: 'Yarumal', label: 'Yarumal' },
      { id: 'San Pedro de los Milagros', label: 'San Pedro Milagros' }, { id: 'Girardota', label: 'Girardota' },
      { id: 'Copacabana', label: 'Copacabana' }, { id: 'Bello', label: 'Bello' }
    ];

    const edgesG1 = [
      // Salidas desde Montería (Rutas directas penalizadas fuertemente)
      { from: 'Montería', to: 'Planeta Rica', label: '180 km' },
      { from: 'Montería', to: 'Buenavista', label: '160 km' },
      { from: 'Montería', to: 'Montelíbano', label: '60 km' },
      { from: 'Montería', to: 'Puerto Libertador', label: '85 km' },
      
      // Enjambre del San Jorge y Bajo Cauca
      { from: 'Montelíbano', to: 'Puerto Libertador', label: '20 km' },
      { from: 'Montelíbano', to: 'La Apartada', label: '35 km' },
      { from: 'Puerto Libertador', to: 'Caucasia', label: '45 km' },
      { from: 'Buenavista', to: 'La Apartada', label: '15 km' },
      { from: 'Planeta Rica', to: 'La Apartada', label: '25 km' },
      { from: 'Planeta Rica', to: 'Buenavista', label: '20 km' },
      { from: 'La Apartada', to: 'Caucasia', label: '15 km' },
      { from: 'La Apartada', to: 'Tarazá', label: '50 km' },
      { from: 'Caucasia', to: 'Tarazá', label: '150 km' },
      { from: 'Caucasia', to: 'Valdivia', label: '90 km' },

      // El gran desvío hacia el Nordeste
      { from: 'Tarazá', to: 'Valdivia', label: '40 km' },
      { from: 'Tarazá', to: 'Anorí', label: '45 km' },
      { from: 'Valdivia', to: 'Yarumal', label: '120 km' },
      { from: 'Valdivia', to: 'Anorí', label: '30 km' },
      { from: 'Anorí', to: 'Amalfi', label: '25 km' },
      { from: 'Amalfi', to: 'Guadalupe', label: '20 km' },
      { from: 'Amalfi', to: 'Yolombó', label: '15 km' },
      { from: 'Yolombó', to: 'Cisneros', label: '20 km' },
      { from: 'Cisneros', to: 'Santo Domingo', label: '15 km' },
      { from: 'Santo Domingo', to: 'Gómez Plata', label: '25 km' },
      
      // Enjambre del Norte (Altamente denso)
      { from: 'Anorí', to: 'Yarumal', label: '55 km' },
      { from: 'Guadalupe', to: 'Carolina del Príncipe', label: '10 km' },
      { from: 'Guadalupe', to: 'Gómez Plata', label: '12 km' },
      { from: 'Carolina del Príncipe', to: 'Gómez Plata', label: '8 km' },
      { from: 'Carolina del Príncipe', to: 'Angostura', label: '15 km' },
      { from: 'Gómez Plata', to: 'Santa Rosa de Osos', label: '30 km' },
      { from: 'Angostura', to: 'Yarumal', label: '20 km' },
      { from: 'Yarumal', to: 'Santa Rosa de Osos', label: '45 km' },
      
      // Entrada a Medellín (Malla del Valle de Aburrá)
      { from: 'Santo Domingo', to: 'Donmatías', label: '30 km' },
      { from: 'Santo Domingo', to: 'Girardota', label: '40 km' },
      { from: 'Santa Rosa de Osos', to: 'Donmatías', label: '20 km' },
      { from: 'Donmatías', to: 'San Pedro de los Milagros', label: '15 km' },
      { from: 'Donmatías', to: 'Bello', label: '90 km' },
      { from: 'Donmatías', to: 'Girardota', label: '25 km' },
      { from: 'San Pedro de los Milagros', to: 'Bello', label: '15 km' },
      { from: 'San Pedro de los Milagros', to: 'Copacabana', label: '20 km' },
      { from: 'Girardota', to: 'Copacabana', label: '10 km' },
      { from: 'Copacabana', to: 'Bello', label: '12 km' },
      { from: 'Bello', to: 'Medellín', label: '15 km' },
      { from: 'Girardota', to: 'Medellín', label: '80 km' },
      { from: 'San Pedro de los Milagros', to: 'Medellín', label: '70 km' }
    ];

    // ==========================================
    // DATOS GRAFO 2: LABERINTO DE OCCIDENTE Y URABÁ
    // ==========================================
    const nodesG2 = [
      { id: 'Montería', label: 'Montería' }, { id: 'Canalete', label: 'Canalete' },
      { id: 'Puerto Escondido', label: 'Pto. Escondido' }, { id: 'Los Córdobas', label: 'Los Córdobas' },
      { id: 'Arboletes', label: 'Arboletes' }, { id: 'San Pedro de Urabá', label: 'San Pedro Urabá' },
      { id: 'Turbo', label: 'Turbo' }, { id: 'Apartadó', label: 'Apartadó' },
      { id: 'Carepa', label: 'Carepa' }, { id: 'Chigorodó', label: 'Chigorodó' },
      { id: 'Mutatá', label: 'Mutatá' }, { id: 'Dabeiba', label: 'Dabeiba' },
      { id: 'Uramita', label: 'Uramita' }, { id: 'Cañasgordas', label: 'Cañasgordas' },
      { id: 'Frontino', label: 'Frontino' }, { id: 'Peque', label: 'Peque' },
      { id: 'Buriticá', label: 'Buriticá' }, { id: 'Abriaquí', label: 'Abriaquí' },
      { id: 'Urrao', label: 'Urrao' }, { id: 'Caicedo', label: 'Caicedo' },
      { id: 'Santa Fé de Antioquia', label: 'Santa Fé Antioquia' }, { id: 'Giraldo', label: 'Giraldo' },
      { id: 'Sopetrán', label: 'Sopetrán' }, { id: 'San Jerónimo', label: 'San Jerónimo' },
      { id: 'Ebéjico', label: 'Ebéjico' }, { id: 'Heliconia', label: 'Heliconia' },
      { id: 'Medellín', label: 'Medellín' }
    ];

    const edgesG2 = [
      // Enjambre Costero / Urabá
      { from: 'Montería', to: 'Canalete', label: '25 km' },
      { from: 'Montería', to: 'Puerto Escondido', label: '150 km' },
      { from: 'Montería', to: 'Los Córdobas', label: '180 km' },
      { from: 'Canalete', to: 'Puerto Escondido', label: '20 km' },
      { from: 'Canalete', to: 'San Pedro de Urabá', label: '40 km' },
      { from: 'Puerto Escondido', to: 'Los Córdobas', label: '15 km' },
      { from: 'Los Córdobas', to: 'Arboletes', label: '20 km' },
      { from: 'Arboletes', to: 'San Pedro de Urabá', label: '30 km' },
      { from: 'Arboletes', to: 'Turbo', label: '120 km' },
      { from: 'San Pedro de Urabá', to: 'Turbo', label: '35 km' },
      { from: 'San Pedro de Urabá', to: 'Apartadó', label: '50 km' },
      
      // Eje Bananero
      { from: 'Turbo', to: 'Apartadó', label: '25 km' },
      { from: 'Turbo', to: 'Carepa', label: '45 km' },
      { from: 'Apartadó', to: 'Carepa', label: '15 km' },
      { from: 'Apartadó', to: 'Chigorodó', label: '30 km' },
      { from: 'Carepa', to: 'Chigorodó', label: '15 km' },
      { from: 'Chigorodó', to: 'Mutatá', label: '35 km' },
      
      // Tapón de la Cordillera
      { from: 'Mutatá', to: 'Dabeiba', label: '160 km' },
      { from: 'Mutatá', to: 'Peque', label: '60 km' },
      { from: 'Mutatá', to: 'Uramita', label: '110 km' },
      { from: 'Dabeiba', to: 'Uramita', label: '30 km' },
      { from: 'Dabeiba', to: 'Peque', label: '40 km' },
      { from: 'Dabeiba', to: 'Frontino', label: '45 km' },
      
      // Malla densa de Occidente
      { from: 'Peque', to: 'Uramita', label: '35 km' },
      { from: 'Peque', to: 'Buriticá', label: '45 km' },
      { from: 'Uramita', to: 'Cañasgordas', label: '25 km' },
      { from: 'Uramita', to: 'Frontino', label: '15 km' },
      { from: 'Frontino', to: 'Abriaquí', label: '20 km' },
      { from: 'Frontino', to: 'Urrao', label: '50 km' },
      { from: 'Cañasgordas', to: 'Buriticá', label: '30 km' },
      { from: 'Cañasgordas', to: 'Giraldo', label: '20 km' },
      { from: 'Cañasgordas', to: 'Abriaquí', label: '35 km' },
      { from: 'Buriticá', to: 'Giraldo', label: '15 km' },
      { from: 'Buriticá', to: 'Santa Fé de Antioquia', label: '90 km' },
      
      // La cuenca del Cauca y el laberinto del sur
      { from: 'Abriaquí', to: 'Urrao', label: '40 km' },
      { from: 'Urrao', to: 'Caicedo', label: '35 km' },
      { from: 'Caicedo', to: 'Santa Fé de Antioquia', label: '25 km' },
      { from: 'Abriaquí', to: 'Santa Fé de Antioquia', label: '50 km' },
      { from: 'Giraldo', to: 'Santa Fé de Antioquia', label: '30 km' },
      
      // Bloqueo final hacia Medellín
      { from: 'Santa Fé de Antioquia', to: 'Medellín', label: '200 km' },
      { from: 'Santa Fé de Antioquia', to: 'Sopetrán', label: '15 km' },
      { from: 'Sopetrán', to: 'San Jerónimo', label: '10 km' },
      { from: 'San Jerónimo', to: 'Medellín', label: '150 km' },
      { from: 'San Jerónimo', to: 'Ebéjico', label: '25 km' },
      { from: 'Caicedo', to: 'Ebéjico', label: '40 km' },
      { from: 'Ebéjico', to: 'Heliconia', label: '15 km' },
      { from: 'Heliconia', to: 'Medellín', label: '35 km' },
      { from: 'Ebéjico', to: 'Medellín', label: '45 km' }
    ];
    
    const data = grafoActivo === 'grafo1' ? { nodes: nodesG1, edges: edgesG1 } : { nodes: nodesG2, edges: edgesG2 };
    const colorNodo = grafoActivo === 'grafo1' ? '#00e5ff' : '#39ff14'; // Cyan y Verde Neón

    const options = {
      physics: { repulsion: { nodeDistance: 250 }, solver: 'repulsion' },
      edges: { font: { align: 'middle', color: '#aaaaaa', strokeWidth: 0 }, color: '#555555' },
      nodes: {
        color: { background: '#1e1e1e', border: colorNodo, highlight: { background: colorNodo, border: '#ffffff' } },
        shape: 'dot', size: 20, borderWidth: 2,
        font: { size: 16, color: '#ffffff', face: 'Arial' }
      }
    };

    if (containerRef.current) {
      new Network(containerRef.current, data, options);
    }
  }, [grafoActivo]);

  return (
    <>
      <style>{`
        body { margin: 0; background-color: #0d1117; color: #c9d1d9; font-family: sans-serif; }
        .layout-container { display: flex; flex-direction: column; min-height: 100vh; padding: 20px; gap: 20px; max-width: 1400px; margin: 0 auto; }
        .sidebar { flex: 1; display: flex; flex-direction: column; gap: 15px; justify-content: center; }
        
        /* CAMBIO CLAVE PARA MÓVILES: Altura fija y ancho al 100% */
        .graph-area { 
          width: 100%;
          height: 500px; 
          background-color: #161b22; 
          border-radius: 16px; 
          border: 1px solid #30363d; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.5); 
        }
        
        .btn { padding: 15px 20px; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .btn-active { background-color: #58a6ff; color: #0d1117; box-shadow: 0 0 10px rgba(88, 166, 255, 0.5); }
        .btn-inactive { background-color: #21262d; color: #c9d1d9; border: 1px solid #30363d; }
        .btn-inactive:hover { background-color: #30363d; }
        
        /* COMPORTAMIENTO EN PC (Pantallas grandes) */
        @media (min-width: 768px) { 
          .layout-container { flex-direction: row; padding: 40px; } 
          .graph-area { flex: 3; height: 80vh; } 
        }
      `}</style>

      <div className="layout-container">
        <div className="sidebar">
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: '#ffffff' }}>Redes Viales</h1>
          <p style={{ color: '#8b949e', lineHeight: '1.6' }}>
            Actividad 5: Teoría de Grafos.<br/>
            Arrastra los nodos para explorar la red. Los vértices representan los municipios y las aristas las distancias en km.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <button 
              className={`btn ${grafoActivo === 'grafo1' ? 'btn-active' : 'btn-inactive'}`}
              onClick={() => setGrafoActivo('grafo1')}>
              Ruta 1: Nordeste
            </button>
            <button 
              className={`btn ${grafoActivo === 'grafo2' ? 'btn-active' : 'btn-inactive'}`}
              onClick={() => setGrafoActivo('grafo2')}>
              Ruta 2: Occidente
            </button>
          </div>
        </div>
        <div className="graph-area" ref={containerRef} />
      </div>
    </>
  );
}