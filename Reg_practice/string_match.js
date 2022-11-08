// 1. 两种模糊匹配

// var regex = /hello/;
// console.log(regex.test('hello'));
// => true

//  1.1 横向模糊匹配
// 横向模糊指的是，一个正则可匹配的字符串的长度不是固定的，可以是多种情况的。
// 其实现的方式是使用量词。譬如{m,n}，表示连续出现最少m次，最多n次。

// var regex = /ab{2, 5}c/g;
// var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
// console.log(string.match(regex));
// => ["abbc", "abbbc", "abbbbc", "abbbbbc"]

//  1.2  纵向模糊匹配
// 纵向模糊指的是，一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能。
// 其实现的方式是使用字符组。譬如[abc]，表示该字符是可以字符“a”、“b”、“c”中的任何一个。

var regexc = /a[123]b/g;
var string = "a0b a1b a2b a3b a4b";
console.log(string.match(regexc));
// => ["a1b", "a2b", "a3b"]

// 2.字符组

//  2.1 范围表示法