import {
  Cpu, Monitor, CircuitBoard, Radio, Database, Zap, Compass, Code2, Terminal,
  Network, Layers, Bot, Folder, Boxes, Car, FileText, Settings, Wrench,
} from 'lucide-react'

// Keys stored in the database (skills.icon / tech_proof.icon) map to icons here.
export const ICONS = {
  cpu: Cpu,
  monitor: Monitor,
  chip: CircuitBoard,
  radio: Radio,
  database: Database,
  zap: Zap,
  compass: Compass,
  code: Code2,
  terminal: Terminal,
  network: Network,
  layers: Layers,
  bot: Bot,
}

// Category slug → icon for the journal sidebar
export const CATEGORY_ICONS = {
  all: FileText,
  systems: Settings,
  embedded: CircuitBoard,
  cpp: Code2,
  'computer-architecture': Cpu,
  linux: Monitor,
  automotive: Car,
  projects: Boxes,
  notes: Folder,
  default: Wrench,
}

export const Icon = ({ name, ...props }) => {
  const C = ICONS[name] || Cpu
  return <C {...props} />
}
