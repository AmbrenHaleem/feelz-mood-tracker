import * as SQLite from 'expo-sqlite';

function open() {
    return SQLite.openDatabase('mood-tracker.db');
}

export function init() {
    return new Promise((resolve, reject) => {
        const database = open();

    database.transaction(
        (tx) => { 
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Activities (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    activity TEXT NOT NULL
                    )
                    `,
                [],
                (tx, result) => {
                    //console.log('Activities table created',result);
                    resolve(true);
                },
                
                (tx, error) => {
                    console.log('SQL Error:', error.message);
                    reject(error);
                }
            );
            // console.log('Transaction:',tx);
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS MoodType (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    moodType TEXT NOT NULL
                    )
                    `,
                [],
                (tx, result) => {
                    //console.log('Activities table created',result);
                    resolve(true);
                },
                
                (tx, error) => {
                    console.log('SQL Error:', error.message);
                    reject(error);
                }
            );
            // console.log('Transaction:',tx);
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Mood (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    mood TEXT NOT NULL,
                    activity TEXT NOT NULL,
                    contact TEXT NOT NULL,
                    detail TEXT NOT NULL,
                    moodDatetime TEXT NOT NULL
                    )
                    `,
                [],
                (tx, result) => {
                    //console.log('Activities table created',result);
                    resolve(true);
                },
                
                (tx, error) => {
                    console.log('SQL Error:', error.message);
                    reject(error);
                }
            );
        },

        (error) => {
            console.log('Tx Error:',error.message);
        },
        () => { 
           // console.log('Tx Success');
        }
    );
});
}

export function destroy(tableName){
    return new Promise((resolve, reject) => {
        const database = SQLite.open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                //'DROP TABLE IF EXISTS Activities',
                `DROP TABLE IF EXISTS ${tableName};`,
                [],
                (tx,result) => {
                    resolve(true);
                },
                (tx, error) => {
                    reject(error);
                }
            );
           },
           (error) => {
                reject(error);
           }
        );
    });
}

export function remove(id, tableName) {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `
                    DELETE FROM ${tableName}
                    WHERE id = ?
                    `,
                    [id],
                    (tx, result) => {
                        console.log('Delete', result);
                        resolve();
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    })
}

export function removeAll(tableName) {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `
                    DELETE FROM ${tableName}
                    `,
                    [],
                    (tx, result) => {
                        console.log('Delete', result);
                        resolve();
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    })
}

/**
 * Methods to read, add and update Activity
 */

export function readActivities() {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM Activities',
                    [],
                    (tx, result) => {
                        const activities = [];
                        //console.log('Read:', result);
                        result.rows._array.forEach(row => {
                            const activity = {
                                id: row.id,
                                activity : row.activity
                            }
                            activities.push(activity);
                            //console.log('Activity:',activity);
                        });

                        resolve(activities);
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function addActivity(activity) {
    return new Promise((resolve, reject) => {
        const database = open();
        console.log('Database opened', database);
        database.transaction(
            (tx) => {
                console.log('Database opened and now in transaction', database);
                tx.executeSql(
                    `
                    INSERT INTO Activities (activity)
                    VALUES (?)
                    `,
                    [activity],
                    (tx, result) => {
                        // console.log('Data Added', result);
                        const newActivityEntry = {
                            activity: activity
                        };
                        resolve(newActivityEntry);
                    },
                    (tx, error) => {
                        //console.log('Failed to add data', error.message);
                        reject(error);
                    }
                );
            },
            (error) => {
                //console.log('Failed to add data', error.message);
                reject(error);
            }
        );
    });
}

export function updateActivity(id, activity) {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `
                    UPDATE Activities
                    SET activity = ?
                    WHERE id = ?;
                    `,
                    [activity,id],
                    (tx, result) => {
                        resolve();
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    });
}

/**
 * Methods to read, add and update Mood Type
 */

export function readMoodType() {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM MoodType',
                    [],
                    (tx, result) => {
                        const moodTypes = [];
                        //console.log('Read:', result);
                        result.rows._array.forEach(row => {
                            const moodType = {
                                id: row.id,
                                moodType : row.moodType
                            }
                            moodTypes.push(moodType);
                            //console.log('Activity:',activity);
                        });

                        resolve(moodTypes);
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function addMoodType(moodType) {
    return new Promise((resolve, reject) => {
        const database = open();
        console.log('Database opened', database);
        database.transaction(
            (tx) => {
                console.log('Database opened and now in transaction', database);
                tx.executeSql(
                    `
                    INSERT INTO MoodType (moodType)
                    VALUES (?)
                    `,
                    [moodType],
                    (tx, result) => {
                        // console.log('Data Added', result);
                        const newMoodTypeEntry = {
                            moodType: moodType
                        };
                        resolve(newMoodTypeEntry);
                    },
                    (tx, error) => {
                        //console.log('Failed to add data', error.message);
                        reject(error);
                    }
                );
            },
            (error) => {
                //console.log('Failed to add data', error.message);
                reject(error);
            }
        );
    });
}

export function updateMoodType(id, moodType) {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `
                    UPDATE MoodType
                    SET moodType = ?
                    WHERE id = ?;
                    `,
                    [moodType,id],
                    (tx, result) => {
                        resolve();
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    });
}

/**
 * Methods to read, add and update Mood 
 */

export function readMood() {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `SELECT * FROM Mood `,
                    [],
                    (tx, result) => {
                        const moods = [];
                        //console.log('Read:', result);
                        result.rows._array.forEach(row => {
                            const mood = {
                                id: row.id,
                                mood : row.mood,
                                activity: row.activity,
                                contact: row.contact,
                                detail: row.detail,
                                moodDatetime: row.moodDatetime
                            }
                            moods.push(mood);
                            //console.log('Activity:',activity);
                        });

                        resolve(moods);
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function addMood(mood, activity, contact, detail, moodDatetime) {
    return new Promise((resolve, reject) => {
        const database = open();
        console.log('Database opened', database);
        database.transaction(
            (tx) => {
                console.log('Database opened and now in transaction', database);
                tx.executeSql(
                    `
                    INSERT INTO Mood (mood, activity, contact, detail, moodDatetime)
                    VALUES (?,?,?,?,?)
                    `,
                    [mood, activity, contact, detail, moodDatetime ],
                    (tx, result) => {
                        // console.log('Data Added', result);
                        const newMoodEntry = {
                            mood: mood,
                            activity: activity,
                            contact: contact,
                            detail: detail,
                            moodDatetime: moodDatetime
                        };
                        resolve(newMoodEntry);
                    },
                    (tx, error) => {
                        //console.log('Failed to add data', error.message);
                        reject(error);
                    }
                );
            },
            (error) => {
                //console.log('Failed to add data', error.message);
                reject(error);
            }
        );
    });
}

export function updateMood(id, mood, activity) {
    return new Promise((resolve, reject) => {
        const database = open();
        database.transaction(
            (tx) => {
                tx.executeSql(
                    `
                    UPDATE Mood
                    SET mood = ?, activity = ?, contact = ?, detail = ?, moodDatetime = ?
                    WHERE id = ?;
                    `,
                    [mood, activity, id],
                    (tx, result) => {
                        resolve();
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
    });
}
