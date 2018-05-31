import { Injectable } 					from '@angular/core';
import { SQLiteDatabaseConfig }			from '@ionic-native/sqlite';

declare var SQL;

@Injectable()
export class MockSQLiteObject {
	_objectInstance: any;

	constructor(_objectInstance: any) {
		this._objectInstance = _objectInstance;
	};

	executeSql(statement: string, params: any): Promise<any> {

		return new Promise((resolve, reject) => {
			try {
				var st = this._objectInstance.prepare(statement, params);
				var rows: Array<any> = [];
				while (st.step()) {
					var row = st.getAsObject();
					rows.push(row)
				}
				var payload = {
					rows: {
						item: function (i) {
							return rows[i];
						},
						length: rows.length
					},
					rowsAffected: this._objectInstance.getRowsModified() || 0,
					insertId: this._objectInstance.insertId || void 0
				};

				//save database after each sql query

				var arr: ArrayBuffer = this._objectInstance.export();
				localStorage.setItem("database", String(arr));

				resolve(payload);
			} catch (e) {
				reject(e);
			}
		});
	};

}

@Injectable()
export class MockSQLite {
	public create(config: SQLiteDatabaseConfig): Promise<MockSQLiteObject> {
		var db;
		var storeddb = localStorage.getItem("database");

		var arr = storeddb.split(',');
		if (storeddb) {
			db = new SQL.Database(arr);
		}
		else {
			db = new SQL.Database();
		}

		return new Promise((resolve, reject) => {
			resolve(new MockSQLiteObject(db));
		});
	}
}
