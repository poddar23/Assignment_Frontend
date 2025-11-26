/*Write a C program that takes a string as input and reverses it using a function.
 Challenge: Write the program without using built-in string handling functions*/

#include <stdio.h>

// Function to reverse a string
void reverseString(char str[]) {
    int length = 0;

    // Calculate the length of the string manually
    while (str[length] != '\0') {
        length++;
    }

    // Reverse the string in place
    for (int i = 0; i < length / 2; i++) {
        char temp = str[i];
        str[i] = str[length - 1 - i];
        str[length - 1 - i] = temp;
    }
}

int main() {
    char str[100];
    printf("Enter a string: ");
    fgets(str, sizeof(str), stdin);
    for (int i = 0; str[i] != '\0'; i++) {
        if (str[i] == '\n') {
            str[i] = '\0';
            break;
        }
    }

    reverseString(str);
    printf("Reversed string: %s\n", str);

    return 0;
}
