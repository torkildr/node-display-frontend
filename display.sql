CREATE TABLE texts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  url TEXT DEFAULT NULL,
  updated INT DEFAULT 0,
  updateInterval INT DEFAULT 0,
  text TEXT,
  showTime INT,
  scrolling TEXT,
  -- start/end time in seconds after midnight (more easily filtered this way)
  startTime INT,
  endTime INT,
  -- we use bitmasks for this one
  weekday INT
);

-- seconds of the day
CREATE VIEW seconds
AS
SELECT (strftime("%H", 'now', 'localtime')*60*60) + (strftime("%M", 'now', 'localtime')*60) + strftime("%S", 'now', 'localtime') AS seconds;

-- lists active texts
CREATE VIEW texts_active
AS
SELECT t.*
FROM texts t
LEFT JOIN seconds s
WHERE (t.startTime < t.endTime AND t.startTime <= s.seconds AND t.endTime >= s.seconds) OR
      (t.startTime > t.endTime AND t.startTime >= s.seconds AND t.endTime >= s.seconds)
ORDER BY t.startTime ASC,
  t.endTime ASC,
  t.name ASC;

-- lists (active) outdated urls
CREATE VIEW texts_outdated
AS
SELECT t.*
FROM texts_active t
WHERE t.updated < (strftime("%s") - t.updateInterval)
  AND t.url IS NOT NULL
  AND t.url != '';

INSERT INTO texts (name, text, showTime, scrolling, startTime, endTime, weekday)
VALUES ('Active 24/7', '24/7', 1, 'auto', (0*60*60)+(0*60)+0,(23*60*60)+(59*60)+59, (1<<7)-1);

INSERT INTO texts (name, text, showTime, scrolling, startTime, endTime, weekday)
VALUES ('Early morning', 'early', 1, 'auto', (6*60*60)+(0*60)+0,(8*60*60)+(59*60)+59, (1<<7)-1);

INSERT INTO texts (name, text, showTime, scrolling, startTime, endTime, weekday)
VALUES ('Mid day', 'midday', 1, 'auto', (10*60*60)+(0*60)+0,(14*60*60)+(59*60)+59, (1<<7)-1);

INSERT INTO texts (name, text, showTime, scrolling, startTime, endTime, weekday)
VALUES ('Evening', 'evening', 1, 'auto', (17*60*60)+(0*60)+0,(22*60*60)+(59*60)+59, (1<<7)-1);

INSERT INTO texts (name, text, showTime, scrolling, startTime, endTime, weekday)
VALUES ('Night time', 'all night long', 1, 'auto', (22*60*60)+(0*60)+0,(07*60*60)+(59*60)+59, (1<<7)-1);

INSERT INTO texts (name, text, url, updated, updateInterval, showTime, scrolling, startTime, endTime, weekday)
VALUES ('Update from URL', 'not updated', '/foo', 0, 16, 1, 'auto', (0*60*60)+(0*60)+0,(23*60*60)+(59*60)+59, (1<<7)-1);

INSERT INTO texts (name, text, url, updated, updateInterval, showTime, scrolling, startTime, endTime, weekday)
VALUES ('Weather data', 'not updated', 'http://localhost:3000/data/foo', 0, 30 * 60, 1, 'auto', (0*60*60)+(0*60)+0,(23*60*60)+(59*60)+59, (1<<7)-1);

