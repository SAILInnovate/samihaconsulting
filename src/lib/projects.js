export const projects = [
  {
    id: 'floorplan',
    title: 'Planning Permission Floor Plans',
    category: 'Ground-Up Builds',
    discipline: 'architectural',
    image: '/projects/kitchen.png',
    summary:
      'Professional floor plans scaled and detailed specifically for planning permission applications.',
    detail:
      'For clients building from the ground up, we convert initial ideas or rough sketches into precise, scaled floor plans required by local authorities. We ensure all necessary details are included for a smooth planning approval process.',
    value: 'Streamlines the planning permission process and provides a solid foundation for your build.',
    specs: ['Planning Applications', 'Scaled Drawings', 'Ground-Up Builds'],
  },
  {
    id: 'pdf-dwg',
    title: 'Scanned PDF Conversion',
    category: 'PDF to DWG',
    discipline: 'civil',
    image: '/projects/siteplan.png',
    summary:
      'An uneditable scanned PDF site plan converted back into a working CAD file.',
    detail:
      'The client only had an old, flattened PDF of their site boundary and drainage runs. We manually traced and rebuilt the geometry in AutoCAD, restoring it to a fully editable 2D DWG format.',
    value: 'Saves hours of manual retracing by in-house staff.',
    specs: ['PDF Tracing', 'Scaled', 'Editable DWG'],
  },
  {
    id: 'redline',
    title: 'Red-Line Revisions',
    category: 'Drafting Support',
    discipline: 'mechanical',
    image: '/projects/stanchion.png',
    summary:
      'Incorporating engineer markup revisions into an existing drawing set.',
    detail:
      'The client provided a scanned copy of an existing CAD drawing marked up with red pen corrections. We opened their original DWG file, applied all the requested dimensional and geometric changes, and delivered the updated files.',
    value: 'Quick, accurate updates to keep the project moving.',
    specs: ['Markup implementation', 'Quick Turnaround', 'Version Control'],
  },
]

export const services = [
  {
    id: 'pdf',
    title: 'PDF to DWG conversion',
    description: 'We manually trace and redraw flat PDFs into fully editable, clean AutoCAD files.',
  },
  {
    id: 'sketch',
    title: 'Hand sketch to CAD',
    description: 'Send us a photo of your paper sketch and get back a professional, scaled DWG.',
  },
  {
    id: 'planning',
    title: 'Planning Permission Drawings',
    description: 'Scaled, accurate floor plans tailored for ground-up builds and planning applications.',
  },
  {
    id: 'floor',
    title: 'Floor plan redrawing',
    description: 'Old paper floor plans digitized into modern CAD layouts for renovations or sales.',
  },
  {
    id: 'redline',
    title: 'Red-line revisions',
    description: 'We update your existing DWG files based on your scanned red-pen markups.',
  },
  {
    id: 'support',
    title: 'CAD drafting support',
    description: 'Overflow drafting assistance when your in-house team is at maximum capacity.',
  },
]
