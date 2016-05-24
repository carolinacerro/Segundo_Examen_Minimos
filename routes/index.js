
var Controller = require ('./controller.js');

module.exports = function(app) {

    /////////////////////////////////////////////////////////////////
    // Crear un nuevo estudiante
    app.post('/api/student', Controller.setStudent);
    // Devolver todos los estudiantes
    app.get('/api/student', Controller.getStudents);
    // Devolver un estudiante
    app.get('/api/student/:student_id', Controller.getStudent);
    // Eliminar estudiante
    app.delete('/api/student/:student_id', Controller.deleteStudent);

    /////////////////////////////////////////////////////////////////
    // Añadir asignatura
    app.post('/api/subject', Controller.setSubject);
    // Listado de asignaturas CU_1
    app.get('/api/subject', Controller.getSubjects);
    // Ver detalle de una asignatura CU_3
    app.get('/api/subject/:subject_id', Controller.getSubject);
    // Eliminar asignatura
    app.delete('/api/subject/:subject_id', Controller.deleteSubject);
    // Añadir alumno en asignatura CU_2
    app.post('/api/subject/:subject_id', Controller.addStudent);

    //Ver detalle de un estudiante dentro de asignatura CU_4
    /*app.get('/api/subject/:subject_id', Controller.getSubject);*/


    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // Carga única de la vista
    });
};