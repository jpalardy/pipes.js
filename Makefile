
SRC_DIR = src
TEST_DIR = test

PREFIX = .
DIST_DIR = ${PREFIX}/dist

BASE_FILES = ${SRC_DIR}/filter.js\
	${SRC_DIR}/limiter.js\
	${SRC_DIR}/pager.js\
	${SRC_DIR}/pipe.js\
	${SRC_DIR}/sorter.js

PIPES = ${DIST_DIR}/pipes.js

all: pipes lint
	@@echo "pipes.js build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

pipes: ${PIPES}

${PIPES}: ${BASE_FILES} ${DIST_DIR}
	@@echo "Building" ${PIPES}
	@@cat ${BASE_FILES} > ${PIPES}

lint: ${PIPES}
	@@echo "Checking pipes.js against JSLINT..."
	@@jslint ${PIPES}

