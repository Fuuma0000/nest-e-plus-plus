# Work_data_technology

## Description

<details>
<summary><strong>Table Definition</strong></summary>

```sql
CREATE TABLE `Work_data_technology` (
  `work_data_id` int unsigned NOT NULL,
  `technology_id` int unsigned NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`work_data_id`,`technology_id`),
  KEY `Work_data_technology_technology_id_idx` (`technology_id`),
  KEY `Work_data_technology_work_data_id_idx` (`work_data_id`),
  CONSTRAINT `Work_data_technology_technology_id_fkey` FOREIGN KEY (`technology_id`) REFERENCES `Technology` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Work_data_technology_work_data_id_fkey` FOREIGN KEY (`work_data_id`) REFERENCES `Work_data` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

</details>

## Columns

| Name | Type | Default | Nullable | Extra Definition | Children | Parents | Comment |
| ---- | ---- | ------- | -------- | ---------------- | -------- | ------- | ------- |
| work_data_id | int unsigned |  | false |  |  | [Work_data](Work_data.md) |  |
| technology_id | int unsigned |  | false |  |  | [Technology](Technology.md) |  |
| created_at | datetime | CURRENT_TIMESTAMP | true | DEFAULT_GENERATED |  |  |  |
| updated_at | datetime | CURRENT_TIMESTAMP | true | DEFAULT_GENERATED |  |  |  |

## Constraints

| Name | Type | Definition |
| ---- | ---- | ---------- |
| PRIMARY | PRIMARY KEY | PRIMARY KEY (work_data_id, technology_id) |
| Work_data_technology_technology_id_fkey | FOREIGN KEY | FOREIGN KEY (technology_id) REFERENCES Technology (id) |
| Work_data_technology_work_data_id_fkey | FOREIGN KEY | FOREIGN KEY (work_data_id) REFERENCES Work_data (id) |

## Indexes

| Name | Definition |
| ---- | ---------- |
| Work_data_technology_technology_id_idx | KEY Work_data_technology_technology_id_idx (technology_id) USING BTREE |
| Work_data_technology_work_data_id_idx | KEY Work_data_technology_work_data_id_idx (work_data_id) USING BTREE |
| PRIMARY | PRIMARY KEY (work_data_id, technology_id) USING BTREE |

## Relations

![er](Work_data_technology.svg)

---

> Generated by [tbls](https://github.com/k1LoW/tbls)