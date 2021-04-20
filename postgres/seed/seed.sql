BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');

INSERT into login (hash, email) values ('$2y$10$bW3cr2MGtCfnzcmcqFGJvepC7V78ouEQmpsB2uJYi6CSOvmuALs2S', 'jessie@gmail.com');

COMMIT;