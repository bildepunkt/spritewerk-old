var Field = function(options) {
    this.x = options.x || 100;
    this.y = options.y || 100;
    this.operator = options.operator || '+'; // | *
    // proximity-based influence. -1 for constant
    this.magnitude = options.magnitude || -1;
    this.
    this.force = options.force || 8;
    this.shape = options.shape || 'linear'; // | 'radial'
    this.type = options.type || 'repeller'; // | 'attractor'
};

