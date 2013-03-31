CREATE TABLE texts (
  id INTEGER PRIMARY KEY,
  text TEXT,
  showTime INT,
  scrolling TEXT,
  -- start/end time in seconds after midnight (more easily filtered this way)
  startTime INT,
  endTime INT
);

