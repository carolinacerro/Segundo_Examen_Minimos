
var Student = require('./model/student');
var Subject = require('./model/subject');

// Obtiene todos los objetos estudiantes de la base de datos
exports.getStudents = function (req, res){
    Student.find(
        function(err, student) {
            if (err)
                res.send(err);
            res.json(student);
        }
    );
};

// Guarda un objeto Student en base de datos
exports.setStudent = function(req, res) {

    // Creo el objeto phones: [req.body.phones.home, req.body.phones.work]
    Student.create(
        {name : req.body.name, address: req.body.address, phones: {home: req.body.phones.home, work: req.body.phones.work}},
        function(err, student) {
            if (err)
                res.send(err);
            // Obtiene y devuelve todos los students tras crear uno
            Student.find(function(err, student) {
                if (err)
                    res.send(err);
                res.json(student);
            });
        });

};

/////////////////////////////////////////////////////////////////
// Obtiene todos los objetos subject de la base de datos
exports.getSubjects = function (req, res){
    Subject.find(
        function(err, subject) {
            if (err)
                res.send(err);
            res.json(subject);
        }
    );
};

// Obtiene detalles de una asignatura
exports.getSubject = function(req, res){
    Subject.findOne( {_id : req.params.subject_id},
        function(err, subject) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (subject == null){
                console.log("¡La asignatura no existe!");
                res.json(subject);
            }
            else {
                console.log("Existe la asignatura")
                res.json(subject);
            }
        });
};

// Guarda un objeto subject en base de datos
exports.setSubject = function(req, res) {
    Subject.create(
        {name : req.body.name},
        function(err, subject) {
            if (err)
                res.send(err);
            // Obtiene y devuelve todos los subjects tras crear una
            Subject.find(function(err, subject) {
                if (err)
                    res.send(err);
                res.json(subject);
            });
        });
};

// Añadimos estudiante a asignatura
exports.addStudent = function(req, res){
    //Verificamos que el usuario existe
    Student.findOne( {name : req.body.student},
        function(err, student) {
            if (err) {
                res.send(err);
                Console.log(err);
                res.json(student);
            }
            else if (student == null){
                console.log("¡El usuario no existe!");
                res.json(student);
            }
            else {
                console.log("Existe el usuario");
                console.log("Usuario:", student.name, "ID:", student._id);
                //Añadimos usuario a la asignatura
                Subject.update( {_id : req.params.subject_id},
                    {$push: {students : student._id}},
                    function(err, subject) {
                        if (err)
                            res.send(err);
                        //Devuelve la asignatura actualizada
                        Subject.find({_id : req.params.subject_id},
                            function(err, subject) {
                            if (err)
                                res.send(err);
                                console.log("Añadido", subject);
                                res.json(subject);
                        });
                    });
            }
        });
};


//Obtener detalle estudiante
exports.getStudent = function(req, res) {
    Student.findOne( {_id : req.params.student_id},
        function(err, student) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (student == null){
                console.log("¡El usuario no existe!");
                res.json(student);
            }
            else {
                console.log("Existe el usuario")
                res.json(student);
            }
        });
};



//Event.findOneAndUpdate({"_id": req.params._id}, {$addToSet: {attendees: req.body.attendees}}, req.body, function (err, event) {
//    console.log(event._id);

// Eliminar asignatura
exports.deleteSubject = function(req, res) {
    Subject.remove({_id : req.params.subject_id}, function(err, subject) {
        if (err)
            res.send(err);
        Subject.find(function(err, subject) {
            if (err)
                res.send(err);
            res.json(subject);
        });
    });
};

// Eliminar estudiante
exports.deleteStudent = function(req, res) {
    Student.remove({_id : req.params.student_id}, function(err, student) {
        if (err)
            res.send(err);
        Student.find(function(err, student) {
            if (err)
                res.send(err);
            res.json(student);
        });
    });
};