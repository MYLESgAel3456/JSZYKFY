// 代码生成时间: 2025-09-12 01:25:04
     *             It includes basic error handling, comments, and follows JS best practices for maintainability and scalability.
     */
    
    // Function to shift a character by a certain number of positions in the alphabet
    const shiftChar = (char, shift) => {
# 增强安全性
        const isLower = char === char.toLowerCase();
        const code = char.charCodeAt(0);
        const base = isLower ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        const shiftedCode = ((code - base + shift) % 26) + base;
        return String.fromCharCode(shiftedCode);
    };
    
    // Encrypt a password using a Caesar cipher algorithm
# 改进用户体验
    const encryptPassword = (password, shift) => {
# 改进用户体验
        if (typeof password !== 'string' || typeof shift !== 'number') {
# TODO: 优化性能
            throw new Error('Invalid input: password must be a string and shift must be a number.');
        }
        
        return password.split('').map(char => {
            if (char.match(/[a-zA-Z]/)) {
                return shiftChar(char, shift);
            } else {
# 改进用户体验
                return char;
            }
        }).join('');
    };
    
    // Decrypt a password using a Caesar cipher algorithm
    const decryptPassword = (encryptedPassword, shift) => {
        if (typeof encryptedPassword !== 'string' || typeof shift !== 'number') {
            throw new Error('Invalid input: encryptedPassword must be a string and shift must be a number.');
        }
        
        return encryptPassword(encryptedPassword, -shift);
    };
    
    // Example usage
    try {
        const password = 'mySecretPassword123';
        const shift = 3;
        
        const encrypted = encryptPassword(password, shift);
        console.log(`Encrypted password: ${encrypted}`);
        
        const decrypted = decryptPassword(encrypted, shift);
        console.log(`Decrypted password: ${decrypted}`);
    } catch (error) {
        console.error(error.message);
    }
    