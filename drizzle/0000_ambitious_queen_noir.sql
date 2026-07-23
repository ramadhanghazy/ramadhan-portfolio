CREATE TABLE `leads` (
	`id` integer PRIMARY KEY NOT NULL,
	`company` text NOT NULL,
	`contact` text NOT NULL,
	`stage` text NOT NULL,
	`source` text NOT NULL,
	`owner` text NOT NULL,
	`value` real NOT NULL,
	`last_contact` text NOT NULL,
	`next_action` text NOT NULL,
	`next_action_date` text NOT NULL,
	`notes` text NOT NULL
);
--> statement-breakpoint
WITH RECURSIVE sequence(id) AS (
  SELECT 1
  UNION ALL
  SELECT id + 1 FROM sequence WHERE id < 60
)
INSERT INTO `leads` (
  `id`, `company`, `contact`, `stage`, `source`, `owner`, `value`,
  `last_contact`, `next_action`, `next_action_date`, `notes`
)
SELECT
  id,
  CASE id % 10
    WHEN 0 THEN 'Northstar Studio'
    WHEN 1 THEN 'Copper & Co. Foods'
    WHEN 2 THEN 'Brightline Advisory'
    WHEN 3 THEN 'Morrow Supply'
    WHEN 4 THEN 'Fieldnote Digital'
    WHEN 5 THEN 'Harbor Works'
    WHEN 6 THEN 'Juniper Labs'
    WHEN 7 THEN 'Paper Kite Studio'
    WHEN 8 THEN 'Goodwell Foods'
    ELSE 'Clearpath Advisory'
  END || ' ' || printf('%02d', id),
  CASE id % 8
    WHEN 0 THEN 'Avery Brooks'
    WHEN 1 THEN 'Jordan Kim'
    WHEN 2 THEN 'Casey Singh'
    WHEN 3 THEN 'Morgan Miller'
    WHEN 4 THEN 'Riley Rivera'
    WHEN 5 THEN 'Taylor Bell'
    WHEN 6 THEN 'Cameron Foster'
    ELSE 'Reese Young'
  END,
  CASE id % 5
    WHEN 0 THEN 'new'
    WHEN 1 THEN 'qualified'
    WHEN 2 THEN 'proposal'
    WHEN 3 THEN 'won'
    ELSE 'lost'
  END,
  CASE id % 4 WHEN 0 THEN 'Referral' WHEN 1 THEN 'Website' WHEN 2 THEN 'LinkedIn' ELSE 'Partner' END,
  CASE id % 3 WHEN 0 THEN 'Maya Chen' WHEN 1 THEN 'Theo Grant' ELSE 'Nina Patel' END,
  2400 + ((id * 1375) % 28600),
  date('2026-07-23', printf('-%d days', (id * 3) % 32)),
  CASE id % 6
    WHEN 0 THEN 'Discovery call'
    WHEN 1 THEN 'Send proposal'
    WHEN 2 THEN 'Review scope'
    WHEN 3 THEN 'Follow up'
    WHEN 4 THEN 'Share estimate'
    ELSE 'Contract review'
  END,
  date('2026-07-23', printf('%+d days', (id % 13) - 5)),
  'Synthetic demonstration record. No real customer or personal data is used.'
FROM sequence;
