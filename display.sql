CREATE TABLE texts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  dataUrl TEXT,
  nextUpdate INT,
  updateInterval INT,
  text TEXT,
  showTime INT,
  scrolling TEXT,
  -- start/end time in seconds after midnight (more easily filtered this way)
  startTime INT,
  endTime INT,
  -- we use bitmasks for this one
  weekday INT
);

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

INSERT INTO texts (name, text, dataUrl, nextUpdate, showTime, scrolling, startTime, endTime, weekday)
VALUES ('Update from URL', 'not updated', 'http://localhost:3000/foo', 0, 1, 'auto', (0*60*60)+(0*60)+0,(23*60*60)+(59*60)+59, (1<<7)-1);

