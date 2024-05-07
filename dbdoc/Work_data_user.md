# Work_data_user

## Description

<details>
<summary><strong>Table Definition</strong></summary>

```sql
CREATE TABLE `Work_data_user` (
  `work_data_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `role_explanation` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`work_data_id`,`user_id`),
  KEY `Work_data_user_user_id_idx` (`user_id`),
  KEY `Work_data_user_work_data_id_idx` (`work_data_id`),
  CONSTRAINT `Work_data_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Work_data_user_work_data_id_fkey` FOREIGN KEY (`work_data_id`) REFERENCES `Work_data` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

</details>

## Columns

| Name | Type | Default | Nullable | Extra Definition | Children | Parents | Comment |
| ---- | ---- | ------- | -------- | ---------------- | -------- | ------- | ------- |
| work_data_id | int unsigned |  | false |  |  | [Work_data](Work_data.md) |  |
| user_id | int unsigned |  | false |  |  | [User](User.md) |  |
| role_explanation | varchar(50) |  | true |  |  |  |  |
| created_at | datetime | CURRENT_TIMESTAMP | true | DEFAULT_GENERATED |  |  |  |
| updated_at | datetime | CURRENT_TIMESTAMP | true | DEFAULT_GENERATED |  |  |  |

## Constraints

| Name | Type | Definition |
| ---- | ---- | ---------- |
| PRIMARY | PRIMARY KEY | PRIMARY KEY (work_data_id, user_id) |
| Work_data_user_user_id_fkey | FOREIGN KEY | FOREIGN KEY (user_id) REFERENCES User (id) |
| Work_data_user_work_data_id_fkey | FOREIGN KEY | FOREIGN KEY (work_data_id) REFERENCES Work_data (id) |

## Indexes

| Name | Definition |
| ---- | ---------- |
| Work_data_user_user_id_idx | KEY Work_data_user_user_id_idx (user_id) USING BTREE |
| Work_data_user_work_data_id_idx | KEY Work_data_user_work_data_id_idx (work_data_id) USING BTREE |
| PRIMARY | PRIMARY KEY (work_data_id, user_id) USING BTREE |

## Relations

![er](Work_data_user.svg)

---

> Generated by [tbls](https://github.com/k1LoW/tbls)