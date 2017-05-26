console.log('load hello');

module.exports = function() {
	Creep.prototype.sayHello = function() {
		console.log(this.name + " says: Hello Sunshine");
	};
}
