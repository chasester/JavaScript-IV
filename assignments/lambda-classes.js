// CODE here for your Lambda Classes

class School
{
    constructor(instructors, Pm)
    {
        this.classes = [];
        for(let i = 0; i < instructors.length; i++) this.classes.push({instructor: instructors[i], students : [], subject: instructors[i].favLanguage, myName: `${instructors[i].favLanguage}${Math.floor(Math.random()*100)}00`});
        this.students = [];
        this.instructors = instructors;
        this.Pm = Pm;
        this.almni = [];
    }

    signup(student, subject)
    {
        for(let i = 0; i < this.classes.length; i++)
            if(this.classes[i].subject == subject) 
            {
                this.classes[i].students.push(student);
                student.className = this.classes[i].myName;
                this.students.push(student);
            }
        if(student.className === "") return `${student.myName} couldnt find that class.`
        return `${student.myName} signed up for classes.`
    }
    teach()
    {
        this.classes.map(x=> x.students.map(y=> x.instructor.demo(x.instructor.favLanguage,y)));
    }
    grade()
    {
        this.classes.map(x=> x.students.map(y=> x.instructor.grade(y)));
    }
    sprint()
    {
        for(let i = 0; i < 4; i++)
        {
            this.teach();
            this.classes.map(x=> x.students.map(y=> y.PRAssignment(x.subject)));
            this.grade();
        }
        this.classes.map(x=> x.students.map(y=> {
            var grade = x.instructor.grade(y)
            if (grade < 70) return `${y.myName} needs to be added to flex.`
            y.week+= 1;
            if(y.week > 40) return this.graduate(y,x);
        }));
    }
    graduate(student,_class)
    {
        this.students = this.students.filter(x=> x !== student);
        _class.students = _class.students.filter(x=> x !== student);
        if(!student)return;
        if(Math.random() > 0.1) this.almni.push(student);
        else this.Pm.push( new ProjectMgr({
            myName: student.myName,
            location: student.location,
            age: student.age,
            gender: student.gender
          }))
        return `${student.myName} has Graduated from lambda!`
    }
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

function randomCurve(influence)
{
    var L = 100;
    var k = 0.08;
    var x0 = 39 - (influence)/2;
    var x = (Math.random()*100);
    return clamp(L/(1+Math.pow(Math.E,(-k*(x-x0)))), 0, 100); //fun S style curve where x0 determinds the offset of the curve, so lower levels of x0 will lead to higher grades and higher will lead to lower grades
}

class Person
{
    constructor(obj)
    {
        this.myName = obj.myName;
        this.age = obj.age;
        this.location = obj.location;
        this.gender= obj.gender;
    }
    speak(){return `Hello my myName is ${this.myName}, I am from ${this.location}.`}
}

class Instructor extends Person
{
    constructor(obj)
    {
        super(obj);
        this.specialty = obj.specialty;
        this.favLanguage = obj.favLanguage;
        this.catchPhrase = obj.catchPhrase;
        this.teachingSkill = Math.random()*10;
    }
    demo(subject, student)
    {
        var modifier = Math.random()*this.teachingSkill;
        student.learn(subject,modifier);
        return `Today we are learning about ${subject}`;
    }
    grade(student, subject)
    {
        var grade = randomCurve(student.studious +  student.skill);
        student.recieveGrade(grade);
        return grade;
       
    }
}
class Student extends Person
{
    constructor(obj)
    {
        super(obj);
        this.previousBackground = obj.previousBackground;
        this.className = "";
        this.subject = obj.subject;
        this.studious = obj.studious;
        this.instructor = "";
        this.week = 0;
        this.skill = obj.skill;
    }
    listsSubjects()
    {
        let ret = ""
        //subject.fliter(x=> x.skill >= 5).map(x=> ret+= x.myName + " ");
        this.skill >=5;
        return ret;
    }
    learn(subject,modifier)
    {
        this.skill += modifier - (randomCurve(0)-100)/50;
    }
    PRAssignment(subject)
    {
        if(randomCurve(this.studious +  this.skill) < 60)
            lambda.Pm[Math.floor(Math.random()*lambda.Pm.length)].debugCode(this, subject);
        else this.skill += Math.random();
        return `${this.myName} has submitted an PR for ${subject}`
    }
    recieveGrade(grade,subject)
    {
        return `${this.myName} recieves a ${grade}% in ${subject}.`
    }
}

class ProjectMgr extends Instructor
{
    constructor(obj)
    {
        super(obj);
        this.gradclassName = obj.gradclassName;
        this.favInstructor = obj.favInstructor;
    }
    standup(channel)
    {
        return `${this.myName} announces to ${channel}.`
    }
    debugCode(student, subject)
    {
        student.skill += (Math.random()*this.teachingSkill)-2;
        return `${this.myName} debugs ${student.myName}'s code in ${subject}`
    }
}

var lambda = new School
(
    [
        new Instructor({
            myName: 'Josh Neol',
            location: 'Heaven',
            age: 37,
            gender: 'male',
            favLanguage: 'JavaScript',
            specialty: 'Being Awesome',
            catchPhrase: `God Bless You`
          })
    ],//instructors
    [
        new ProjectMgr({
            myName: 'Fred',
            location: 'Bedrock',
            age: 37,
            gender: 'male',
            favLanguage: 'JavaScript',
            specialty: 'Front-end',
            catchPhrase: `Don't forget the homies`,
            gradclassName : 'java2038',
            favInstructor : "Josh Noel"
          })
    ]//pms
);

for(let j = 0; j < 42; j++){
    for(let i = 0; i < (Math.random()*20)+20; i++)
    {
        lambda.signup(new Student({
        myName: Math.random().toString(),
        location: Math.random().toString(),
        age: Math.random()*100,
        gender: Math.random() >= 0.5 ? "Male" : "Female",
        previousBackground: "none",
        subject: "JavaScript",
        skill: Math.random()*2,
        studious: Math.random()*3,
    }),"JavaScript");
    }
    lambda.sprint();
}

console.log(lambda);