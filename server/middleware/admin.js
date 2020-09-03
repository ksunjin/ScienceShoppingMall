let admin = (req, res, next) => {
    if (req.user.role === 1) {
        return res.send('관리자만 사용할 수 있는 기능입니다.')
    }
    next()
}

module.exports = { admin }