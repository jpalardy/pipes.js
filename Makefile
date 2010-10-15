
SRC_DIR = src
TEST_DIR = test

PREFIX = .
DIST_DIR = ${PREFIX}/dist

JSLINT = jslint
NODE = node

BASE_FILES = ${SRC_DIR}/pipe.js\
	${SRC_DIR}/pager.js\
	${SRC_DIR}/limiter.js\
	${SRC_DIR}/filter.js\
	${SRC_DIR}/sorter.js

TEST_FILES = ${TEST_DIR}/test.js\
	${TEST_DIR}/pipe.js\
	${TEST_DIR}/pager.js\
	${TEST_DIR}/limiter.js\
	${TEST_DIR}/filter.js\
	${TEST_DIR}/sorter.js

PIPES = ${DIST_DIR}/pipes.js
TEST_PIPES = ${DIST_DIR}/test_pipes.js

all: pipes
	@@echo "pipes.js build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

pipes: ${PIPES}

${PIPES}: ${BASE_FILES} ${DIST_DIR}
	@@echo "Building" ${PIPES}
	@@cat ${BASE_FILES} > ${PIPES}

test_pipes: ${TEST_PIPES}

${TEST_PIPES}: ${TEST_FILES} ${DIST_DIR}
	@@echo "Building" ${TEST_PIPES}
	@@cat ${TEST_FILES} > ${TEST_PIPES}

test: ${PIPES} ${TEST_PIPES}
	@@echo "Testing" ${TEST_PIPES}
	@@${NODE} ${TEST_PIPES}

lint: ${PIPES} ${TEST_PIPES}
	@@echo "Checking" ${PIPES} "against JSLINT..."
	@@${JSLINT} ${PIPES}
	@@echo "Checking" ${TEST_PIPES} "against JSLINT..."
	@@${JSLINT} ${TEST_PIPES}

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
