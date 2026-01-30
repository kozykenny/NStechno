// Animated Particle Background
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.shapes = [];
        this.particleCount = 100;
        this.connectionDistance = 140;
        this.shapeCount = 8;
        
        this.init();
        this.animate();
        this.handleResize();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.createShapes();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2.5 + 1.5,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.45 + 0.5,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    createShapes() {
        this.shapes = [];
        for (let i = 0; i < this.shapeCount; i++) {
            const size = Math.random() * 150 + 80;
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: size,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.12 + 0.1,
                type: Math.random() > 0.5 ? 'circle' : 'polygon',
                sides: Math.floor(Math.random() * 4) + 3
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            { r: 249, g: 115, b: 22 },   // Orange
            { r: 236, g: 72, b: 153 },  // Pink
            { r: 79, g: 70, b: 229 },   // Purple
            { r: 168, g: 85, b: 247 },  // Purple-500
            { r: 139, g: 92, b: 246 }   // Purple-400
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticles() {
        for (let particle of this.particles) {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges with slight randomness
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Add slight random drift
            particle.vx += (Math.random() - 0.5) * 0.02;
            particle.vy += (Math.random() - 0.5) * 0.02;
            
            // Limit velocity
            particle.vx = Math.max(-1, Math.min(1, particle.vx));
            particle.vy = Math.max(-1, Math.min(1, particle.vy));
            
            // Pulse effect
            particle.pulse += 0.02;
        }
        
        // Update shapes
        for (let shape of this.shapes) {
            shape.x += shape.vx;
            shape.y += shape.vy;
            shape.rotation += shape.rotationSpeed;
            
            // Wrap around edges
            if (shape.x < -shape.size) shape.x = this.canvas.width + shape.size;
            if (shape.x > this.canvas.width + shape.size) shape.x = -shape.size;
            if (shape.y < -shape.size) shape.y = this.canvas.height + shape.size;
            if (shape.y > this.canvas.height + shape.size) shape.y = -shape.size;
            
            // Slight drift
            shape.vx += (Math.random() - 0.5) * 0.01;
            shape.vy += (Math.random() - 0.5) * 0.01;
            shape.vx = Math.max(-0.5, Math.min(0.5, shape.vx));
            shape.vy = Math.max(-0.5, Math.min(0.5, shape.vy));
        }
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.4;
                    this.ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawShapes() {
        for (let shape of this.shapes) {
            this.ctx.save();
            this.ctx.translate(shape.x, shape.y);
            this.ctx.rotate(shape.rotation);
            
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size);
            gradient.addColorStop(0, `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${shape.opacity})`);
            gradient.addColorStop(0.5, `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${shape.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            
            if (shape.type === 'circle') {
                this.ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
            } else {
                // Draw polygon
                const sides = shape.sides;
                for (let i = 0; i < sides; i++) {
                    const angle = (Math.PI * 2 / sides) * i;
                    const x = Math.cos(angle) * shape.size;
                    const y = Math.sin(angle) * shape.size;
                    if (i === 0) {
                        this.ctx.moveTo(x, y);
                    } else {
                        this.ctx.lineTo(x, y);
                    }
                }
                this.ctx.closePath();
            }
            
            this.ctx.fill();
            this.ctx.restore();
        }
    }
    
    drawParticles() {
        for (let particle of this.particles) {
            const pulseSize = Math.sin(particle.pulse) * 0.3 + 1;
            const radius = particle.radius * pulseSize;
            
            // Create gradient for each particle
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, radius * 3
            );
            gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})`);
            gradient.addColorStop(0.5, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, radius * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Core dot
            this.ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity * 1.5})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawShapes();
        this.drawConnections();
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.resize();
                // Redistribute particles
                for (let particle of this.particles) {
                    particle.x = Math.random() * this.canvas.width;
                    particle.y = Math.random() * this.canvas.height;
                }
                // Redistribute shapes
                for (let shape of this.shapes) {
                    shape.x = Math.random() * this.canvas.width;
                    shape.y = Math.random() * this.canvas.height;
                }
            }, 250);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new ParticleBackground('particleCanvas');
});
