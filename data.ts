import { Product, ProductCategory } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Oyster Perpetual Elite',
    brand: 'Rolex-Style',
    price: 14500,
    category: ProductCategory.LUXURY,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop',
    description: 'La definición de prestigio. Forjado en oro de 18k con una esfera verde oliva que captura la luz de forma única.',
    specs: ['Automático 3235', 'Cristal Zafiro', 'Resistente 100m', 'Oro 18k'],
    isFeatured: true
  },
  {
    id: '2',
    name: 'SpeedMaster Dark Side',
    brand: 'Omega-Style',
    price: 9200,
    category: ProductCategory.SPORT,
    image: 'https://images.unsplash.com/photo-1623998021450-85c29c644e0d?q=80&w=1000&auto=format&fit=crop',
    description: 'Nacido para la velocidad. Cerámica negra y un cronógrafo de precisión certificado por METAS.',
    specs: ['Cronógrafo Co-Axial', 'Cerámica Negra', 'Tacómetro', 'Antimagnético'],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Grand Complication',
    brand: 'Patek-Style',
    price: 45000,
    category: ProductCategory.LUXURY,
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=1000&auto=format&fit=crop',
    description: 'Una obra maestra de la ingeniería mecánica. Calendario perpetuo y fase lunar en una caja de platino.',
    specs: ['Cuerda Manual', 'Fase Lunar', 'Calendario Perpetuo', 'Correa Cocodrilo'],
    isFeatured: true
  },
  {
    id: '4',
    name: 'Series 9 Ultra',
    brand: 'Tech-Style',
    price: 899,
    category: ProductCategory.SMART,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop',
    description: 'El compañero definitivo para la aventura y la salud. Caja de titanio aeroespacial.',
    specs: ['Pantalla Retina', 'GPS Doble Frecuencia', 'Sensor Oxígeno', 'Sumergible 100m'],
    isFeatured: false
  },
  {
    id: '5',
    name: 'Prospex Diver',
    brand: 'Seiko-Style',
    price: 1200,
    category: ProductCategory.SPORT,
    image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1000&auto=format&fit=crop',
    description: 'Construido para resistir las presiones del mar profundo. Un clásico reinventado.',
    specs: ['Automático', 'Bisel Giratorio', 'Luminiscencia LumiBrite', 'Acero Inoxidable'],
    isFeatured: true
  },
  {
    id: '6',
    name: 'Tank Solo Gold',
    brand: 'Cartier-Style',
    price: 6400,
    category: ProductCategory.CLASSIC,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop',
    description: 'Líneas puras y diseño geométrico. Un icono del diseño art déco que nunca pasa de moda.',
    specs: ['Cuarzo Alta Precisión', 'Oro Rosa', 'Cabujón Zafiro', 'Diseño Rectangular'],
    isFeatured: false
  },
  {
    id: '7',
    name: 'Pilot Chrono',
    brand: 'IWC-Style',
    price: 5800,
    category: ProductCategory.CLASSIC,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop',
    description: 'Legibilidad absoluta y precisión militar. El reloj de los aviadores por excelencia.',
    specs: ['Automático', 'Día y Fecha', 'Caja Hierro Dulce', 'Cristal Antirreflejos'],
    isFeatured: false
  },
  {
    id: '8',
    name: 'Royal Oak Offshore',
    brand: 'AP-Style',
    price: 32000,
    category: ProductCategory.LUXURY,
    image: 'https://images.unsplash.com/photo-1547996663-0b5b0e53f331?q=80&w=1000&auto=format&fit=crop',
    description: 'Audaz, potente y extremadamente deportivo. El reloj que rompió las reglas.',
    specs: ['Cronógrafo', 'Tornillos Hexagonales', 'Brazalete Integrado', 'Acero 904L'],
    isFeatured: true
  }
];