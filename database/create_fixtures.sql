CREATE TABLE IF NOT EXISTS cocktails (
    search text,
    hits bigint,
    ingredients json,
    last_query timestamp
);