export const projects = [
  {
    id: 'stanchion',
    title: 'Metal Stanchion Mount',
    category: 'Mechanical Drafting',
    discipline: 'mechanical',
    summary:
      'A precision mechanical component drawing for a structural steel stanchion mount, using chamfer and fillet commands to define safe edge geometry.',
    detail:
      'This drawing demonstrates the application of chamfer and fillet commands to a load-bearing stanchion mount. Every edge is defined with exact coordinates and dimensional limits so the fabricated part mates correctly with its mating assembly — preventing interference, galling, and misalignment at install.',
    value: 'Demonstrates how accurate drawings ensure parts fit and operate correctly the first time.',
    specs: ['AutoCAD 2D', 'Chamfer & Fillet', 'Dimensioned', 'Layered'],
  },
  {
    id: 'kitchen',
    title: 'Kitchen Unit Plan',
    category: 'Architectural Planning',
    discipline: 'architectural',
    summary:
      'A fully layered residential kitchen unit plan, drawn to scale with appliance clearances, worktop runs, and ergonomic traffic zones.',
    detail:
      'A scaled kitchen unit plan drawn across standard AIA layers — fixtures, cabinetry, appliances, and dimensions isolated for clean handoff. Appliance clearances and work triangle distances are dimensioned to ensure ergonomic compliance and that no clash occurs between trades on site.',
    value: 'Showcases clear communication between teams working on building layouts.',
    specs: ['Scaled 1:50', 'AIA Layered', 'Appliance Clearances', 'Dimensioned'],
  },
  {
    id: 'converge',
    title: 'Converge Drawing',
    category: 'Architectural Planning',
    discipline: 'architectural',
    summary:
      'A convergence layout showing how multiple structural and architectural elements meet at a single junction point.',
    detail:
      'The Converge drawing resolves the junction where several building elements intersect. Each element is isolated on its own layer so the architect, structural engineer, and M&E subcontractor can all read the same file without overwriting each others annotations.',
    value: 'Proves coordination across disciplines before construction begins.',
    specs: ['Multi-layer', 'Junction Detail', 'Trade-isolated', 'Coordinated'],
  },
  {
    id: 'siteplan',
    title: '2D Site Plan',
    category: 'Civil Infrastructure',
    discipline: 'civil',
    summary:
      'A complete 2D site plan covering plot boundaries, access routes, drainage runs, and building footprints for a residential development.',
    detail:
      'A full 2D site plan drawn to scale, showing plot boundaries, vehicular access, drainage invert levels, and building footprints. The drawing is structured for direct submission to a local planning portal and ready for integration into larger motorway, drainage, or housing infrastructure schemes.',
    value: 'Proves readiness for planning infrastructure such as motorways, drainage systems and housing projects.',
    specs: ['Scaled', 'Boundary-defined', 'Drainage Runs', 'Planning-ready'],
  },
]

export const services = [
  {
    id: 'pdf-to-dwg',
    icon: 'convert',
    title: 'PDF & Sketch to DWG Conversion',
    description:
      'Hand your messy paper plans or scanned PDFs to me and receive a precise, fully layered AutoCAD file — layered to industry standard and ready for the design phase.',
    deliverable: 'Layered DWG in 48 hours',
  },
  {
    id: 'mechanical',
    icon: 'gear',
    title: '2D Mechanical Drafting',
    description:
      'Component and assembly drawings applying exact coordinates, dimensional limits, chamfers and fillets so fabricated parts fit and operate correctly.',
    deliverable: 'Dimensioned component drawings',
  },
  {
    id: 'architectural',
    icon: 'plan',
    title: 'Architectural Layouts & Site Plans',
    description:
      'Scaled floor plans, elevations, and civil site plans drawn across clean layers for frictionless handoff between architect, engineer, and contractor.',
    deliverable: 'Coordinated, planning-ready drawings',
  },
]

export const valueProps = [
  {
    title: 'Risk Mitigation',
    body: 'Design flaws are caught and corrected in the digital file long before construction — preventing expensive structural or mechanical failures on site.',
  },
  {
    title: 'Technical Precision',
    body: 'Strict coordinates, exact dimensions, and properly defined limits applied to every line so your project executes flawlessly the first time.',
  },
  {
    title: 'Industry Compliance',
    body: 'Drawings produced to BIM-aware standards with clean layering that integrates smoothly with your existing project team and software stack.',
  },
]
