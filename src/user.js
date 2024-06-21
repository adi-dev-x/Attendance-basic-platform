const connection = require('./db');
class User {
async getQuery(req, res) {
        console.log("reached", req);
        console.log("this is data", req.body.query);
       try {
            const text = req.body.query;
            const rows = await connection.query(text);
            console.log(rows);

            return res.status(201).send({
                'message': rows
            });
        } catch (error) {
            return res.status(400).send({
                'message': error
            });
        }
 }
    async getemployee(req, res) {
        console.log("reached", req);
        console.log("this is data", req.body.query);

        try {
            const text = 'select * from employ where status=\'Active\';';
            const rows = await connection.query(text);
            console.log(rows);

            return res.status(201).send({
                'message': rows
            });
        } catch (error) {
            return res.status(400).send({
                'message': error
            });
        }
    }
    async adminLogin(req, res) {
        console.log("reached")
        var body=req.body
     
        //  var body=JSON.stringify(req.body) ()
       
        if (!body.username || !body.password ) {
          var k="missing values"
          console.log("reached in chenk")
          const error = new Error(k);
     error.statusCode = 404;
    
     // Sending the error response
     res.status(error.statusCode).json({ error: error.message });
        }
        try {
            console.log("inside the tryy and data !!!!",body.username, body.password)
            const text = 'SELECT * FROM admin WHERE username = $1 and password=$2';
            const { rows } = await connection.query(text, [body.username, body.password]);
            console.log(rows)
            if (!(rows.length)) {
              var k="not exist"
              console.log("reached in chenk")
              const error = new Error(k);
         error.statusCode = 404;
       
         // Sending the error response
         res.status(error.statusCode).json({ error: error.message });
            }
            else{
                console.log("scsdsds............",rows[0])
                return res.status(201).send({
                    'message': rows
                });
              }
        } catch (error) {
            
        }
   }
  async getDeviceid(req){
    const text = 'SELECT device_id FROM employ WHERE username = $1 and password=$2';
    const { rows } = await connection.query(text, [body.username, body.password]);



  }
async empLogin(req, res) {
    console.log("reached empLogin")
    var body=req.body
     
    //  var body=JSON.stringify(req.body) ()
   
    if (!body.username || !body.password ) {
      var k="missing values"
      console.log("reached in chenk ")
      const error = new Error(k);
 error.statusCode = 404;

 // Sending the error response
 res.status(error.statusCode).json({ error: error.message });
    }
    try {
        console.log("inside the tryy and data !!!!",body.username, body.password,body.device_id)
        const text = 'SELECT * FROM employ WHERE username = $1 and password=$2';
        const { rows } = await connection.query(text, [body.username, body.password]);
         console.log("     +++++++this is deviceid   ",rows[0].device_id)
        if (!(rows.length)) {
          var k="not exist"
          console.log("reached in chenk")
          const error = new Error(k);
     error.statusCode = 404;
   
     // Sending the error response
     res.status(error.statusCode).json({ error: error.message });
        }
        else{
            console.log(" in first else")
            if(!rows[0].device_id)
            { 
             
             // const text = 'SELECT * FROM employ WHERE username = $1 and password=$2 and device_id=$3';
              //const { rows } = await connection.query(text, [body.username, body.password,body.device_id]);
              
               const text = `UPDATE employ SET device_id=$1 WHERE username=$2 AND password=$3 RETURNING *`;
               const values = [body.device_id, body.username, body.password];
        
              const { result } = await connection.query(text, values);
                 return res.status(201).send({
                'message': rows
            });
           }    
           else{ 
              console.log("inside the else there is device_id")
              const text = 'SELECT * FROM employ WHERE username = $1 and password=$2 and device_id=$3';
               const { rows } = await connection.query(text, [body.username, body.password,body.device_id]);
               console.log("there is the data heheheh    ",rows.length)
                   var pk= await this.check(rows)
                   console.log("out the pk !!!!! ",pk)
                   if(pk){
                    console.log("inside the pk !!!!! ",pk)
                    return res.status(201).send({
                        'message': rows
                    });

                   } else{
                    return res.status(404).send({
                        'message': "wrong device"
                    });


                   }

            }
        
          }
    } catch (error) {
        
    }
  }
 async check(rows){
    console.log("inside the check")
    if (!(rows.length)) {
        console.log( "In last if")
//          var k="not logined in a valid device"
//          console.log("reached in chenk")
//          const error = new Error(k);
//          error.statusCode = 404;

// // Sending the error response
//         res.status(error.statusCode).json({ error: error.message });
        return null
        }
        else{
          console.log("scsdsds............",rows[0])
            //  return res.status(201).send({
            // 'message': rows
            //   });
            return rows
        }


 }
async updateempLogin(req, res) {
    console.log("reached empLogin")
    var body=req.body
     
    //  var body=JSON.stringify(req.body) ()
   
    if (!body.username || !body.password ) {
      var k="missing values"
      console.log("reached in chenk ")
      const error = new Error(k);
 error.statusCode = 404;

 // Sending the error response
 res.status(error.statusCode).json({ error: error.message });
    }
    try {
        console.log("inside the tryy and data !!!!",body.username, body.password,body.device_id)
        const text = 'SELECT * FROM employ WHERE username = $1 and password=$2';
        const { rows } = await connection.query(text, [body.username, body.password]);
         console.log(rows,"     +++++++this is deviceid   ",rows[0].device_id)
        if (!(rows.length)) {
          var k="not exist"
          console.log("reached in chenk")
          const error = new Error(k);
     error.statusCode = 404;
   
     // Sending the error response
     res.status(error.statusCode).json({ error: error.message });
        }
        else{
            if(!rows[0].device_id)
            { 

             // const text = 'SELECT * FROM employ WHERE username = $1 and password=$2 and device_id=$3';
              //const { rows } = await connection.query(text, [body.username, body.password,body.device_id]);
              
               const text = `UPDATE employ SET device_id=$1 WHERE username=$2 AND password=$3 RETURNING *`;
               const values = [body.device_id, body.username, body.password];
        
              const { result } = await connection.query(text, values);
                 return res.status(201).send({
                'message': rows
            });
           }    
           else{ 
              const text = 'SELECT * FROM employ WHERE username = $1 and password=$2 and device_id=$3';
               const { row } = await connection.query(text, [body.username, body.password,body.device_id]);
                     if (!(row.length)) {
          var k="not logined in a valid device"
          console.log("reached in chenk")
          const error = new Error(k);
     error.statusCode = 404;
   
     // Sending the error response
          res.status(error.statusCode).json({ error: error.message });
          }
          else{
            console.log("scsdsds............",row[0])
            return res.status(201).send({
                'message': row
            });
          }

            }
            console.log("scsdsds............",rows[0])
            return res.status(201).send({
                'message': rows
            });
          }
    } catch (error) {
        
    }
  }
async getTodayDateInISOFormat() {
    const today = new Date();

    // Get the UTC time in milliseconds and adjust for the IST timezone (+5:30)
    const utcOffset = today.getTimezoneOffset() * 60000; // Timezone offset in milliseconds
    const indiaOffset = 5.5 * 3600000; // IST offset in milliseconds (5 hours 30 minutes)
    const indiaTime = new Date(today.getTime() + utcOffset + indiaOffset);

    const year = indiaTime.getFullYear();
    const month = String(indiaTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(indiaTime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
async getemployeeattendance(req, res) {
    console.log("reached", req.params.id);
    var id=req.params.id
    

    try {
        console.log("check in getTodayDateInISOFormat")
       const date=await this.getTodayDateInISOFormat()
        //const text = 'SELECT * FROM task WHERE employ_f_id = $1 AND attendance_f_id = (SELECT id FROM attendance WHERE employ_f_id = $1 AND date = $2 LIMIT 1);        '
         const text = 'SELECT task.*, site.name,site.longlat FROM task INNER JOIN site ON task.site_f_id = site.id WHERE task.employ_f_id = $1 AND task.attendance_f_id = (SELECT id FROM attendance WHERE employ_f_id = $1 AND date = $2 LIMIT 1);'


        console.log(`SELECT * FROM task WHERE employ_f_id = ${1} AND attendance_f_id = (SELECT id FROM attendance WHERE employ_f_id = ${1}  AND date = ${date} LIMIT 1);`)
        const { rows } = await connection.query(text, [id,date]);
        console.log(rows);
 
        return res.status(201).send({
            'message': rows
        });
    } catch (error) {
        return res.status(400).send({
            'message': error
        });
    }
}
async updateattendancepunchout(req, res) {
    try {
        const body = req.body;
        const id = req.params.id;
        console.log("Reached", id);

        if (!body.out_time || !body.out_location || !body.remarks) {
            const error = new Error("Missing values");
            error.statusCode = 400;
            throw error;
        }

        console.log("Check in getTodayDateInISOFormat");

        const text = `
            UPDATE punching
            SET 
                out_time = $1,
                out_location = $2,
                remarks = $3,
                total_time = EXTRACT(EPOCH FROM (TO_TIMESTAMP($1, 'HH:MI AM') - TO_TIMESTAMP(in_time, 'HH:MI AM'))) / 3600
            WHERE id = $4
        `;

        console.log(`UPDATE punching SET out_time = '${body.out_time}', out_location = '${body.out_location}', remarks = '${body.remarks}', total_time = EXTRACT(EPOCH FROM (TO_TIMESTAMP('${body.out_time}', 'HH:MI AM') - TO_TIMESTAMP(in_time, 'HH:MI AM'))) / 3600 WHERE id = ${id};`);
          const txt=`UPDATE punching SET out_time = '${body.out_time}', out_location = '${body.out_location}', remarks = '${body.remarks}', total_time = EXTRACT(EPOCH FROM (TO_TIMESTAMP('${body.out_time}', 'HH:MI AM') - TO_TIMESTAMP(in_time, 'HH:MI AM'))) / 3600 WHERE id = ${id};`
        let rows;
        try {
            // const result = await connection.query(text, [body.out_time, body.out_location, body.remarks, id]);
            const result = await connection.query(txt);
            rows = result.rows;
        } catch (queryError) {
            console.log("in the first erorrrrr !!!!!")
            console.error('Error executing query', queryError);
            const error = new Error("Failed to update punching record");
            error.statusCode = 500;
            throw error;
        }

        console.log(rows);

        const updateText = 'UPDATE employ SET punch_status = $1 WHERE id = $2;';
        try {
            await connection.query(updateText, [false, body.id]);
        } catch (updateError) {
            console.error('Error updating employ status', updateError);
            const error = new Error("Failed to update employ status");
            error.statusCode = 500;
            throw error;
        }

        return res.status(200).send({
            message: "Punch out updated"
        });
    } catch (error) {
        console.error(error);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        return res.status(statusCode).send({
            message
        });
    }
}

async updateattendancepunchin(req, res) {
    const body = req.body;

    try {
        // Check if employee is already punched in
        const punchStatusText = 'SELECT 1 FROM employ WHERE punch_status = true AND id = $1;';
        const { rows } = await connection.query(punchStatusText, [body.id]);
        if (rows.length > 0) {
            console.log("this is the punched already !!!!!!")
            const error = new Error("Already punched in");
            error.statusCode = 409;
            throw error;
        }

        // Check for missing values
        if (!body.in_time || !body.in_location) {
            const error = new Error("Missing values");
            error.statusCode = 400;
            throw error;
        }

        // Insert punch record
        const insertPunchText = 'INSERT INTO punching (in_time, in_location, task_f_id) VALUES ($1, $2, $3) RETURNING id;';
        const punchResult = await connection.query(insertPunchText, [body.in_time, body.in_location, req.params.id]);
        const createdId = punchResult.rows[0].id;

        // Update punch status in another table
        const updateText = 'UPDATE employ SET punch_status = $1 WHERE id = $2;';
        await connection.query(updateText, [true, body.id]);

        return res.status(201).json({
            message: "New punch in created, please store the ID created",
            id: createdId
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}
async kkupdateattendancepunchin(req, res) {
    var body=req.body
    const text = 'SELECT 1 FROM employ WHERE punch_status = true AND id=$1;'
        const punchStatusResult  = await connection.query(text, [body.id]);
        if (punchStatusResult.rows.length > 0) {
            var k="already punched in"
            console.log("reached in chenk")
            const error = new Error(k);
       error.statusCode = 404;
      
       // Sending the error response
       res.status(error.statusCode).json({ error: error.message });
        }   
 if (!body.in_time || !body.in_location ) {
        var k="missing values"
        console.log("reached in chenk")
        const error = new Error(k);
   error.statusCode = 409;
  
   // Sending the error response
   res.status(error.statusCode).json({ error: error.message });
      }
    console.log("reached", req.params.id);
    var id=req.params.id
    
    try {
        console.log("check in getTodayDateInISOFormat")
       const date=await this.getTodayDateInISOFormat()
       // const text = 'insert punching set in_time=$1,in_location=$2 WHERE employ_f_id = $3 and date=$4;'
        const text = 'insert into punching (in_time,in_location,task_f_id) VALUES ($1, $2, $3) RETURNING id;'
        const { rows } = await connection.query(text, [body.in_time,body.in_location,id]);
        console.log(rows);
        const createdId = rows[0].id;
	const updateText = 'UPDATE employ SET punch_status = $1 WHERE id = $2;';
        await connection.query(updateText, [true, body.id]);
        return res.status(201).send({
            'message': "new punch in created please store the id created",
            'id': createdId

        });
    } catch (error) {
        return res.status(400).send({
            'message': error
        });
    }
}
async automatedTask(req, res) {
    var body = req.body;
    var { attid, empid } = req.body;

    if (!attid || !empid) {
        var k = "missing values";
        console.log("reached in chenk");
        const error = new Error(k);
        error.statusCode = 409;

        // Sending the error response
        return res.status(error.statusCode).json({ error: error.message });
    }

    try {
        const text = "SELECT id FROM site WHERE status = 'Active';";
        const siteIdResult = await connection.query(text);

        console.log("this issss ", siteIdResult.rows);

        const valuesArray = siteIdResult.rows.map(row => `(${row.id}, '${empid}', '${attid}')`);
        const values = valuesArray.join(', ');

        console.log(values);

        const insertText = `INSERT INTO task (site_f_id, employ_f_id, attendance_f_id) VALUES ${values}`;
        console.log("nfkjwdnkfjs ",insertText)
        await connection.query(insertText);

        return res.status(201).send({
            'message': "Records inserted successfully"
        });
    } catch (error) {
        console.error("Error inserting records", error);
        return res.status(500).send({
            'message': error.message
        });
    }
}
}
module.exports = {
    User
};
