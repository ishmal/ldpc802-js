
CC=gcc
CFLAGS=-Wall -g
INC=-Iinclude
LIB=-Lobj

OBJ=\
	obj/ldpc802.o \
	obj/ldpcEncoder.o \
	obj/ldpcDecoder.o \
	obj/codes.o \
	obj/crc32.o \
	obj/util.o

DEPS=\
	include/ldpc802.h src/ldpc802.c \
	include/ldpcEncoder.h src/ldpcEncoder.c \
	include/ldpcDecoder.h src/ldpcDecoder.c \
	include/codes.h src/codes.c \
	include/crc32.h src/crc32.c \
	include/util.h src/util.c


ALL: obj/libldpc802.a

obj/libldpc802.a: $(OBJ)
	$(AR) rcs $@ $(OBJ)

obj/ldpc802.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpc802.c

obj/ldpcEncoder.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpcEncoder.c

obj/ldpcDecoder.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpcDecoder.c

obj/codes.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/codes.c

obj/crc32.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/crc32.c

obj/util.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/util.c


clean:
	$(RM) obj/*

