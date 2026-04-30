export type MilestoneStatus = 'completed' | 'in-progress' | 'planned';

export interface Milestone {
  id: string;
  date: string;
  title: string;
  category: string;
  description: string;
  status: MilestoneStatus;
  tags: string[];
  order: number;
}

export interface RoadmapData {
  milestones: Milestone[];
}
