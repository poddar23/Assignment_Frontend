#include <stdio.h>
#include <string.h>

int main() {
    char str1[100];  // Array to hold the first string
    char str2[100];  // Array to hold the second string

    // Input two strings from the user
    printf("Enter the first string: ");
    fgets(str1, sizeof(str1), stdin);

    printf("Enter the second string: ");
    fgets(str2, sizeof(str2), stdin);

    // Remove the newline character added by fgets, if present
    str1[strcspn(str1, "\n")] = '\0';
    str2[strcspn(str2, "\n")] = '\0';

    // Concatenate the strings using strcat
    strcat(str1, str2);

    // Display the concatenated string
    printf("Concatenated string: %s\n", str1);

    // Display the length of the concatenated string using strlen
    printf("Length of the concatenated string: %zu\n", strlen(str1));

    return 0;
}
